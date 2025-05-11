const createLoginHandler = function(socket, users) {

    return {
        loginReciver: function (database) {
            socket.on('loginSender', async (message) => {
                let data = await database.getUser(message.email, message.password);

                if (data.length === 1 && users.find(user => user.username === data[0].username) === undefined) {
                    socket.username = data[0].username;
                    socket.table = null;
                    socket.emit('loginReciver', {
                        response: 'ok',
                        data: data[0]
                    });
                } else {
                    socket.emit('loginReciver', {
                        response: 'ko',
                        message: 'Credenziali non valide'
                    });
                }
            });
        }
    };
};

module.exports = createLoginHandler;