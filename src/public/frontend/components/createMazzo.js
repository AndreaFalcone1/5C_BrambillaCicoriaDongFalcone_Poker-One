export const createMazzo = () => {
    let deckId = null;

    return {
        build: async function () {
            const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            const data = await res.json();
            if (data.success) {
                deckId = data.deck_id;
                return true;
            }
            return false;
        },
        draw: async function (num) {
            if (!deckId) throw new Error("Deck not built yet");
            const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`);
            const data = await res.json();
            return data.cards;
        }
    };
};
