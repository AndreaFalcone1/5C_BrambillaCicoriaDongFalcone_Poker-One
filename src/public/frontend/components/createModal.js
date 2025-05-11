export const createModal = function(modal) {

    let usernamee;
    let codTablee;

    return {
        setModal: function(func, codTable, username) {
            usernamee = username;
            codTablee = codTable;

            document.getElementById("accettaBtn").onclick = () => {
                func(codTable, username);
                modal.hide();
            };
        },
        show: function() {
            document.getElementById("invitoText").innerText = "Invito da " + usernamee + " al tavolo " + codTablee;
            modal.show();
        }
    }

}