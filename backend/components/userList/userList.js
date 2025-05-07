const createUserList = function(socket, users) {

    return {
        setOnlineUsers: function () {
            users.push(socket.id);

            // Appena il frontend richiede la lista user
            socket.on("getUtentiOnline", () => {
                // Gli manda la lista di utenti online
                socket.emit("utentiOnline", users);
            });

            // Se si disconnette qualcuno riaggiorna la lista
            socket.on('disconnect', () => {
                users = users.filter(user => user !== socket.id)
            });
        },
        inviteSender: async function (invited, table) {
            // All'utente verrà displayato una modale per l'invito
            socket.on("invito", () => {

            });
        }
    }
}