export const createUserList = function(parentElement) {
    const socket = io();
    let userList;

    return {
        getOnlineUsers: function () {
            // Chiedi al backend di inviarti la lista
            // Voglio prendere la lista degli utenti online utente clicca -> lista utenti
            socket.emit("utentiOnline"); 

            // Se l'utente resta fisso sulla schermata di lista utenti questa ogni volta si aggiorna
            socket.on("utentiOnline", (users) => {
                // Supponiamo che users sia una l'username di tutti gli utenti
                userList = users;
                // Ogni volta che riceve una nuova lista di utenti online ridisegna tutto
                this.render();
            });
        },
        inviteSender: function (invited, table) {
            // Invito utente
            socket.emit("invito", {invited, table})
        },
        // Serve a creare la parte grafica
        render: function() {
            let htmlTemplate = "<li>%TEMPLATE%</li>";
            let html = "<ul>";
            userList.forEach(user => {
                html += htmlTemplate.replace("%TEMPLATE%", user);
            });
            html += "</ul>"
            parentElement.innerHTML = html;
        }
    }
}