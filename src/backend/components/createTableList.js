/*
    tables = [
        [
            lista_utenti
        ],
    ]
*/

const createTableList = function(socket, tables, userList) {
    return {
        setTable: function() {
            socket.on("aggiungiTavolo", ({ codTable, users }) => {
                tables.splice(codTable, 0, users);
                userList.forEach(u => {
                    if (users.includes(u.username)) u.table = codTable;
                });
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("aggiungiPersona", ({ codTable, username }) => {
                tables[codTable].push(username);
                userList.forEach(u => {
                    if (u.username == username) u.table = codTable;
                });
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("reqTavoliDisp", () => {
                socket.emit("tavoliDisp", tables);
            });
        }
    }
}

module.exports = createTableList;