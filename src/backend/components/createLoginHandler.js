const createLoginHandler = function(socket) {

    return {
        loginReciver: function (database) {
            socket.on('loginSender', async (message) => {

                console.log(database.getUser(message.email, message.password));

                if(database.getUser(message.email, message.password)) {
                    socket.emit('loginReciver', 'ok');
                } else {
                    socket.emit('loginReciver', 'ko');
                }
                
            })
        }
    }

}

module.exports = createRegisterHandler;