const createRegisterHandler = function(socket) {
    function generateCredentials(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return {
        registerReciver: function (database, mailer) {
            socket.on('registerSender', async (message) => {
                
                let pwd = generateCredentials(15);

                await database.addUser(message.email, pwd, message.username, message.nome, message.cognome, message.data_nascita, 100);

                await mailer.sendMail(message.email, pwd);

                socket.emit('registerReciver', 'Success!');
                
            })
        }
    }

}

module.exports = createRegisterHandler;