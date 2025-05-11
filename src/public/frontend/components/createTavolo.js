import { createMazzo } from "./createMazzo.js";

export const createTavolo = () => {
    let socket;
    let state = {
        id: null,
        username: null,
        chips: 0,
        hand: [],
        communityCards: [],
        pot: 0,
        currentBet: 0,
        isMyTurn: false
    };

    const mazzo = createMazzo();

    const connect = ({ id, username, chips }) => {
        socket = io("http://localhost:3000");

        state.id = id;
        state.username = username;
        state.chips = chips;

        socket.on("connect", () => {
            socket.emit("join_table", {
                id: state.id,
                username: state.username,
                chips: state.chips
            });
        });

        socket.on("your_cards", (cards) => {
            state.hand = cards;
            render();
        });

        socket.on("your_turn", (data) => {
            state.isMyTurn = true;
            state.currentBet = data.currentBet;
            state.pot = data.pot;
            renderControls();
        });

        socket.on("new_community_cards", (data) => {
            state.communityCards = data.communityCards;
            render();
        });

        socket.on("round_won", (data) => {
            alert(`Hai vinto ${data.amount} fiches!`);
        });

        socket.on("showdown", (data) => {
            alert(`Vincitore: ${data.winner.username}`);
        });

        socket.on("game_paused", (data) => {
            alert("Partita in pausa: " + data.reason);
        });

        socket.on("connected", (data) => {
            console.log(data.message);
        });

        socket.on("spectator", (data) => {
            alert(data.message);
        });
    };

    const startRound = () => {
        mazzo.build().then(() => {
            mazzo.draw(2).then((cards) => {
                state.hand = cards;
                socket.emit("your_cards", cards);
            });
        });
    };

    const sendAction = (action) => {
        socket.emit("player_action", action);
        state.isMyTurn = false;
        renderControls();
    };

    const render = () => {
        document.getElementById("hand").innerHTML =
            state.hand.map(c => `<img src="${c.image}" alt="${c.code}" />`).join('');
        document.getElementById("community").innerHTML =
            state.communityCards.map(c => `<img src="${c.image}" alt="${c.code}" />`).join('');
        document.getElementById("pot").textContent = `Piatto: ${state.pot}`;
    };

    const renderControls = () => {
        document.getElementById("controls").style.display = state.isMyTurn ? "block" : "none";
    };

    return {
        connect,
        fold: () => sendAction({ type: "fold" }),
        call: () => sendAction({ type: "call" }),
        raise: (amount) => sendAction({ type: "raise", amount }),
        startRound,
    };
};