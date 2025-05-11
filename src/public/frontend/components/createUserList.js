import { generateUserList } from "./generateUserList.js"
import { createModal } from "./createModal.js";

export const createUserList = (socket) => {

    return {
        getOnlineUsers: function () {
            let ul = generateUserList(document.getElementById("usersList"), socket);
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
        waitingInvites: function () {
            socket.on("invitato", data => {
                let modal = createModal(new bootstrap.Modal(document.getElementById("invitoModal")));
                modal.setModal((ct, usr) => {
                    socket.emit("aggiungiPersona", { codTable: ct, username: usr})
                }, data.table, data.from);
                modal.show();
            });
        },
        inviteSender: function (invited, table) {
            // Invito utente
            socket.emit("invito", { invited, table });
        },
    }
}