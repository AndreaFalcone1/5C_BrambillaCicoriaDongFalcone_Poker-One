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
            socket.on("aggiungiTavolo", (users) => {
                const index = tables.push(users) - 1;
                userList.forEach(u => {
                    if (users.includes(u.username)) u.table = index;
                });
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("aggiungiPersona", ({ codTable, username }) => {
                if (!tables[codTable]?.includes(username)) 
                    tables[codTable]?.push(username);
                userList.forEach(u => {
                    if (u.username == username) u.table = codTable;
                });
                socket.emit("tavoliDisp", tables);
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("eliminaTavolo", ({ codTable }) => {
                tables.splice(codTable, 1);
                socket.emit("tavoliDisp", tables);
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("abbandonoUtente", () => {
                for (let i = 0; i < tables.length; i++) {
                    tables[i] = tables[i].filter(e => e !== socket.username);
                }
                userList.forEach(u => {
                    if (u.username == socket.username) u.table = null;
                });
                socket.emit("tavoliDisp", tables);
                socket.broadcast.emit("tavoliDisp", tables);
            });

            socket.on("reqTavoliDisp", () => {
                socket.emit("tavoliDisp", tables);
            });

            socket.on("disconnect", () => {
                tables.forEach((table, i) => {
                    tables[i] = table.filter(e => e !== socket.username);
                });
                socket.broadcast.emit("tavoliDisp", tables);
            });
        }
    }
}

module.exports = createTableList;