import moment from "/node_modules/moment/dist/moment.js";

export const createRegisterHandler = function(socket) {
    return {
        registerSender: function (email, username, nome, cognome, data_nascita) {
                
            //Username Check
            if(username.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Username not valid!'
            }

            //Username Check
            if(nome.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Name not valid!'
            }

            //Username Check
            if(cognome.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Surname not valid!'
            }

            //Check Date
            moment().format(); 
            let now = moment();
            let date = moment(data_nascita, "MM-DD-YYYY")

            if (now.diff(date, 'years') < 18 || date > now) {
                return 'Date not valid!'
            }
            
            //Send if it's correct
            socket.emit('registerSender',  {
                email: email,
                username: username,
                nome: nome,
                cognome: cognome,
                data_nascita: data_nascita,
            });
            return "Success!";
        },
        registerReciver: function () {
            socket.on('registerReciver', (message) => {
                console.log(message);
            })
        }
    }

}