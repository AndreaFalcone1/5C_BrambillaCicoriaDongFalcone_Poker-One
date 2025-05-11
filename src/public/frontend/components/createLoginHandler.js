export const createLoginHandler = function(socket) {
    let loginCallback = null;

    
    socket.on('loginReciver', (message) => {
        if (loginCallback) {
            loginCallback(message);
            loginCallback = null;
        }
    });

    return {
        loginSender: function (email, password, callback) {
            loginCallback = callback;
            socket.emit('loginSender', {
                email: email,
                password: password
            });
        }
    };
};
