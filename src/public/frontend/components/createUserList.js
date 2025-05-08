/* userList : [
    {
        id: socket.id,
        username: socket.username, 
        table: socket.table
    }
]
*/

import { generateList } from "./createLista.js"

export const createUserList = (socket) => {
    return {
        getOnlineUsers: function () {
            let ul = generateList(document.getElementById("usersList"), socket);
            ul.setCallback(this.inviteSender);

            // Chiedi al backend di inviarti la lista
            // Voglio prendere la lista degli utenti online utente clicca -> lista utenti
            socket.emit("getUtentiOnline");

            // Se l'utente resta fisso sulla schermata di lista utenti questa ogni volta si aggiorna
            socket.on("utentiOnline", (users) => {
                // Ogni volta che riceve una nuova lista di utenti online ridisegna tutto
                ul.setData(users);
                ul.render();
            });

        },
        inviteSender: function (invited, table) {
            // Invito utente
            socket.emit("invito", { invited, table })
        },
    }
}