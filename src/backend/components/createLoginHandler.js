const createLoginHandler = function(socket) {

    return {
        loginReciver: function (database) {
            socket.on('loginSender', async (message) => {
                let data = await database.getUser(message.email, message.password);
                console.log(data);

                if (data.length === 1) {
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