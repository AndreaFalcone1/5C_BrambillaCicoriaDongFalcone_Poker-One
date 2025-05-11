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
            let now = moment();
            let date = moment(data_nascita, "MM-DD-YYYY");

        
            // Controllo se l'utente ha almeno 18 anni e che la data non sia futura
            if (now.diff(date, 'years') < 18 || date.isAfter(now)) {
                return 'Devi avere almeno 18 anni e la data non può essere futura!';
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
