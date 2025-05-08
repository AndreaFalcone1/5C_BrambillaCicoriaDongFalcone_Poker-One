export const createMazzo = () => {

    let creation_URL = "https://www.deckofcardsapi.com/api/deck/new/";
    let draw_URL = "https://www.deckofcardsapi.com/api/deck/$DECK_ID/draw/?count=$CARD_AMMOUNT";

    return {
        build: function() {
            fetch(creation_URL)
            .then(r => r.json())
            .then((data) => {
                if (data.success) {
                    draw_URL = draw_URL.replace("$DECK_ID", data.deck_id);
                    console.log(draw_URL);
                    return true;
                }
                return false;
            });
        },
        draw: function(num) {
            fetch(draw_URL.replace("$CARD_AMMOUNT", num))
            .then((json) => {
                return JSON.stringify(json);
            })
        },
    }
}