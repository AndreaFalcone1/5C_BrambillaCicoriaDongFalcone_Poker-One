import { generateTableList } from "./generateTableList.js";

export const createTableList = (socket) => {
    return {
        getTableList: function () {
            let ul = generateTableList(document.getElementById("tablesList"), socket);
            ul.setCallback(this.joinTable);

            socket.emit("reqTavoliDisp");

            socket.on("tavoliDisp", (tables) => {
                console.log(tables);
                ul.setData(tables);
                ul.render();
            });
        },

        joinTable: function (codTable, username) {
            socket.emit("aggiungiPersona", { codTable, username });
        }
    }
}