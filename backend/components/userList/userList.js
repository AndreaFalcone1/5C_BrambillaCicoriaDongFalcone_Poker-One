export const createUserList = function(socket) {

    return {
        setOnlineUsers: function () {
            // Appena il frontend richiede la lista user
            socket.on("recvUtentiOnline", () => {
                // Gli manda la lista di utenti online
                socket.emit("utentiOnline", null);
            });
        },
        inviteSender: async function (invited, table) {
            // All'utente verrà displayato una modale per l'invito
            socket.on("invito", () => {

            });
        }
    }
}