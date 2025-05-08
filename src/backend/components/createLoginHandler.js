const createLoginHandler = function(socket) {

    return {
        loginReciver: function (database) {
            socket.on('loginSender', async (message) => {

                let data = await database.getUser(message.email, message.password);
                
                if(data.length == 1) {
                    socket.username = data[0].username;
                    socket.table = null;
                    socket.emit('loginReciver', 'ok');
                } else {
                    socket.emit('loginReciver', 'ko');
                }

            })
        }
    }

}

module.exports = createLoginHandler;