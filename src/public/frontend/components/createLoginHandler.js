export const createLoginHandler = function(socket) {

    return {
        loginSender: function (email, password) {
            socket.emit('loginSender', {
                email: email,
                password: password,
            });
        },
        loginReciver: function () {
            socket.on('loginReciver', (message) => {
                console.log(message);
            })
        }
    }

}