export const createLoginHandler = function(socket) {
    let loginCallback = null;

    // Registriamo il listener UNA SOLA VOLTA all'inizio
    socket.on('loginReciver', (message) => {
        if (loginCallback) {
            loginCallback(message);
            loginCallback = null; // pulizia per evitare chiamate multiple
        }
    });

    return {
        loginSender: function (email, password, callback) {
            loginCallback = callback; // assegniamo la callback per il prossimo messaggio
            socket.emit('loginSender', {
                email: email,
                password: password
            });
        }
    };
};
