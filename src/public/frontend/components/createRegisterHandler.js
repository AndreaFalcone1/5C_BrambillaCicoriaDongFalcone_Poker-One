import moment from "/node_modules/moment/dist/moment.js";

export const createRegisterHandler = function(socket) {
    return {
        registerSender: function (email, username, nome, cognome, data_nascita) {
                
            // Controllo se i campi sono vuoti
            if (!email || !username || !nome || !cognome || !data_nascita) {
                return 'Tutti i campi devono essere compilati!';
            }

            // Controllo Username
            if(username.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Username non valido!';
            }

            // Controllo Nome
            if(nome.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Nome non valido!';
            }

            // Controllo Cognome
            if(cognome.match(/[\^°<>#*~!"§$%?®©¶]+/)) {
                return 'Cognome non valido!';
            }

            // Controllo Data
            moment().format(); 
            let now = moment();
            let date = moment(data_nascita, "MM-DD-YYYY");

            if (now.diff(date, 'years') < 18 || date > now) {
                return 'Data non valida!';
            }
            
            // Invia se è corretto
            socket.emit('registerSender',  {
                email: email,
                username: username,
                nome: nome,
                cognome: cognome,
                data_nascita: data_nascita,
            });
            return "Registrazione avvenuta con successo!";
        },
        registerReciver: function () {
            socket.on('registerReciver', (message) => {
                console.log(message);
            });
        }
    }
}
