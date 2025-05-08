const createUserList = function (socket, users) {
    return {
        setOnlineUsers: function () {
            users.push({
                id: socket.id,
                username: socket.username,
                table: socket.table
            });
            socket.broadcast.emit("utentiOnline", users);
            // Appena il frontend richiede la lista user
            socket.on("getUtentiOnline", () => {
                // Gli manda la lista di utenti online
                socket.emit("utentiOnline", users);
            });
            socket.on('disconnect', () => {
                users = users.filter(user => user.id !== socket.id);
                socket.broadcast.emit("utentiOnline", users);
            });
        },
        inviteSender: function () {
            // All'utente verrà displayato una modale per l'invito
            socket.on("invito", ({ invited, table }) => {

            });
        }
    }
}

module.exports = createUserList;