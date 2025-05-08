export const createLoginHandler = function(socket) {

    return {
        registerSender: async function (email, password, username, nome, cognome, data_nascita) {
            await socket.emit('registerSender', {
                email: email,
                password: password,
                username: username,
                nome: nome,
                cognome: cognome,
                data_nascita: data_nascita,
            });
        },
        registerReciver: async  function () {
            await socket.on('registerReciver', () => {
                
            })
        }
    }

}