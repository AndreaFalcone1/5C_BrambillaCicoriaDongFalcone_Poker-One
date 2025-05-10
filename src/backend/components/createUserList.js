const createUserList = function (io, socket, users) {
    return {
        setOnlineUsers: function () {
            // Connessione di un nuovo utente 
            socket.on("connessioneIniziale", (data) => {
                if (!users.some(u => u.username === data.username)) {
                    users.push({
                        id: socket.id,
                        username: data.username,
                        table: data.table
                    });
                }
                socket.username = data.username;
                socket.emit("utentiOnline", users);
                socket.broadcast.emit("utentiOnline", users);
            });
            // Appena il frontend richiede la lista user
            socket.on("getUtentiOnline", () => {
                console.log(users);
                // Gli manda la lista di utenti online apparte quella che la richiede
                socket.emit("utentiOnline", users);
            });
            // Utente si disconnette
            socket.on('disconnect', () => {
                users = users.filter(user => user.id !== socket.id);
                socket.broadcast.emit("utentiOnline", users);
            });
        },
        inviteSender: function () {
            socket.on("invito", ({ invited, table }) => {
                const invitedUser = users.find(user => user.username === invited);
                if (invitedUser) {
                    io.to(invitedUser.id).emit("invitato", {
                        from: users.find(user => user.id === socket.id)?.username,
                        table: table
                    });
                }
            });
        }
    }
}

module.exports = createUserList;