const createTable = () => {
    const players = [];
    const spectators = [];
    const connections = []; // { id, socket }

    const table = {
        communityCards: [],
        pot: 0,
        currentBet: 0,
        currentPlayerIndex: 0,
        round: 'waiting',
        paused: true
    };

    const getSocket = (playerId) => {
        const entry = connections.find(c => c.id === playerId);
        return entry ? entry.socket : null;
    };

    const broadcast = (event, data) => {
        connections.forEach(({ socket }) => {
            socket.emit(event, data);
        });
    };

    const sendToPlayer = (playerId, event, data) => {
        const socket = getSocket(playerId);
        if (socket) socket.emit(event, data);
    };

    const startRound = () => {
        if (players.length < 2) {
            table.paused = true;
            broadcast("game_paused", { reason: "waiting_for_players" });
            return;
        }

        table.paused = false;
        table.communityCards = [];
        table.pot = 0;
        table.currentBet = 0;
        table.currentPlayerIndex = 0;
        table.round = 'preflop';

        broadcast("start_round", {
            communityCards: [],
            pot: 0
        });

        nextTurn();
    };

    const nextTurn = () => {
        const activePlayers = players.filter(p => !p.folded);
        if (activePlayers.length === 1) {
            const winner = activePlayers[0];
            winner.chips += table.pot;
            sendToPlayer(winner.id, "round_won", { amount: table.pot });
            table.paused = true;
            broadcast("game_paused", { reason: "only_one_player_left" });
            return;
        }

        const current = players[table.currentPlayerIndex % players.length];
        if (current.folded) {
            table.currentPlayerIndex++;
            return nextTurn();
        }

        sendToPlayer(current.id, "your_turn", {
            currentBet: table.currentBet,
            pot: table.pot
        });
    };

    const handleAction = (playerId, action) => {
        const player = players.find(p => p.id === playerId);
        if (!player || player.folded) return;

        if (action.type === 'fold') {
            player.folded = true;
        } else if (action.type === 'call') {
            const diff = table.currentBet - player.bet;
            player.chips -= diff;
            player.bet += diff;
            table.pot += diff;
        } else if (action.type === 'raise') {
            const raiseAmount = action.amount;
            table.currentBet = player.bet + raiseAmount;
            player.chips -= table.currentBet - player.bet;
            table.pot += table.currentBet - player.bet;
            player.bet = table.currentBet;
        }

        table.currentPlayerIndex++;
        checkBettingRoundCompletion();
    };

    const checkBettingRoundCompletion = () => {
        if (players.every(p => p.folded || p.bet === table.currentBet)) {
            advanceRound();
        } else {
            nextTurn();
        }
    };

    const advanceRound = async () => {
        players.forEach(p => p.bet = 0);
        table.currentBet = 0;
        table.currentPlayerIndex = 0;

        let newCards = [];

        switch (table.round) {
            case 'preflop':
                newCards = await drawCards(3);
                table.communityCards = newCards;
                table.round = 'flop';
                break;
            case 'flop':
                newCards = await drawCards(1);
                table.communityCards.push(...newCards);
                table.round = 'turn';
                break;
            case 'turn':
                newCards = await drawCards(1);
                table.communityCards.push(...newCards);
                table.round = 'river';
                break;
            case 'river':
                table.round = 'showdown';
                return handleShowdown();
        }

        broadcast("new_community_cards", {
            communityCards: table.communityCards
        });

        nextTurn();
    };

    const handleShowdown = () => {
        const activePlayers = players.filter(p => !p.folded);
        const winner = activePlayers[0];
        winner.chips += table.pot;

        broadcast("showdown", {
            winner: {
                id: winner.id,
                username: winner.username
            },
            pot: table.pot,
            communityCards: table.communityCards
        });

        setTimeout(startRound, 5000);
    };

    return {
        connectSocket: (socket) => {
            socket.on("join_table", (playerData) => {
                const { id, username, chips } = playerData;

                if (players.find(p => p.id === id)) return;

                socket.on("player_action", (action) => {
                    handleAction(id, action);
                });

                if (players.length >= 10) {
                    spectators.push({ id, socket });
                    socket.emit("spectator", { message: "table full" });
                } else {
                    const player = {
                        id,
                        username,
                        chips: (chips === null || chips === undefined) ? 1000 : chips,
                        hand: [],
                        folded: false,
                        bet: 0
                    };
                    players.push(player);
                    connections.push({ id, socket });

                    socket.emit("connected", {
                        message: "joined as player",
                        player: { id, username, chips: player.chips }
                    });

                    if (players.length >= 2 && table.paused) {
                        startRound();
                    }
                }
            });
        },

        disconnectPlayer: (id) => {
            const idx = players.findIndex(p => p.id === id);
            if (idx !== -1) players.splice(idx, 1);

            const connIdx = connections.findIndex(c => c.id === id);
            if (connIdx !== -1) connections.splice(connIdx, 1);

            if (players.length < 2) {
                table.paused = true;
                broadcast("game_paused", { reason: "waiting_for_players" });
            }
        }
    };
};

module.exports = createTable;