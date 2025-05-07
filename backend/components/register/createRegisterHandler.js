const createRegisterHandler = function(socket) {

    return {
        registerReciver: async  function () {
            await socket.on('registerSender', (message) => {
                
            })
        },
        registerSender: async  function (data) {
            await socket.emit('registerReciver', data);
        }
    }

}