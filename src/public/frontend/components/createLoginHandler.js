export const createLoginHandler = function(socket) {

    return {
        loginSender: async function (email, password) {
            await socket.emit('loginSender', {
                email: email,
                password: password,
            });
        },
        loginReciver: async  function () {
            await socket.on('loginReciver', (message) => {
                console.log(message);
            })
        }
    }

}