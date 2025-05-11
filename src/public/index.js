import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js";
import { createLoginHandler } from "./frontend/components/createLoginHandler.js";
import { createForm } from "./frontend/components/createForm.js";
import { createUserList } from "./frontend/components/createUserList.js";
import { createTableList } from "./frontend/components/createTableList.js";
import { createTavolo } from "./frontend/components/createTavolo.js";

location.href = "#welcome";

//
//  Binding
//

const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

const divForm = document.getElementById("divFormLoginRegister");

//const newTableButton = document.getElementById("newTable");

//
//  Vars
//

const form = createForm(divForm);

const socket = io();

const loginHandling = createLoginHandler(socket);
const registerHandling = createRegisterHandler(socket);

const navigator = createNavigator(document.getElementById('bodyContainer'));

let tavolo;

let userData;
let tablesList = [];

//
//
//

loginButton.onclick = function () {
    form.build("login");

    form.onSubmit(function (dict) {
        loginHandling.loginSender(dict.email, dict.password, function (response) {
            console.log("Login ricevuto:", response);

            if (response && response.response === 'ok') {
                userData = response.data;

                document.getElementById('navbar').classList.remove('hidden');
                divForm.classList.add('hidden');
                document.getElementById('errorDiv').classList.add('hidden');
                location.href = '#lobby';

                const personalInfosDiv = document.getElementById('personalInformations');

                let html = '<table class="table">';
                html += '<tr><td>Nome</td><td>' + userData.nome + '</td></tr>';
                html += '<tr><td>Cognome</td><td>' + userData.cognome + '</td></tr>';
                html += '<tr><td>Email</td><td>' + userData.email + '</td></tr>';
                html += '<tr><td>Username</td><td>' + userData.username + '</td></tr>';
                html += '<tr><td>Data di nascita</td><td>' + userData.data_nascita + '</td></tr>';
                html += '<tr><td>Bilancio fiches</td><td>' + userData.balance + '</td></tr>';
                html += '</table>';
                personalInfosDiv.innerHTML = html;

                const socket2 = io();

                const userList = createUserList(socket2);
                const tableList = createTableList(socket2);

                socket2.on("connect", () => {
                    socket2.emit("connessioneIniziale", {
                        username: userData.username,
                        table: null,
                    });
                    socket2.username = userData.username;

                    userList.getOnlineUsers();
                    userList.waitingInvites();
                    tableList.getTableList();
                });


                tavolo = createTavolo(socket);
                tablesList.push(tavolo);
                
                socket.on("gameState", (gameState) => {
                    if (gameState && tavolo) {
                        tavolo.state = gameState;
                        if (gameState.currentPlayer === userData.username) {
                            tavolo.state.isMyTurn = true;
                        } else {
                            tavolo.state.isMyTurn = false;
                        }
                        renderControls();
                    }
                });
                
                socket.on("yourTurn", () => {
                    if (tavolo) {
                        tavolo.state = tavolo.state || {};
                        tavolo.state.isMyTurn = true;
                        renderControls();
                    }
                });
                
                socket.on("turnEnded", () => {
                    if (tavolo) {
                        tavolo.state = tavolo.state || {};
                        tavolo.state.isMyTurn = false;
                        renderControls();
                    }
                });
                
                tavolo.connect({
                    "id": userData.username,
                    "username": userData.username,
                    "chips": userData.balance
                });
                
                tavolo.startRound();
                
                console.log(tavolo);
                
                location.href = '#table';

            } else {
                document.getElementById('errorDiv').classList.remove('hidden');
            }
        });
    });

    form.render();
};

registerButton.onclick = function () {
    form.build("register");

    form.onSubmit(function (dict) {
        console.log(registerHandling.registerSender(dict.email, dict.username, dict.name, dict.surname, dict.date));
        registerHandling.registerReciver();
    });

    form.render();
};

form.render();

// Gestione del tavolo statico
/*
newTableButton.onclick = function () {
    if (!userData) {
        console.error("Nessun utente connesso. Impossibile creare un nuovo tavolo.");
        return;
    }

    const nomeTavolo = userData.username + "'s Tavolo";
    const datiNuovoTavolo = {
        nome: nomeTavolo,
        creatore: userData.username
    };

    tavolo = createTavolo(socket);
    tablesList.push(tavolo);
    tavolo.connect({
        "id": userData.username,
        "username": userData.username,
        "chips": userData.balance
    });
    tavolo.startRound();
    renderControls();
    console.log(tavolo);
};
*/

//
// Gestione dei controlli del tavolo
//

const foldButton = document.getElementById('foldButton');
const callButton = document.getElementById('callButton');
const raiseButton = document.getElementById('raiseButton');

foldButton.onclick = function () {
    tavolo.fold();
};

callButton.onclick = function () {
    tavolo.call();
};

raiseButton.onclick = function () {
    tavolo.raise(50);
};

const controlsDiv = document.getElementById("controls");

const enableControls = () => {
    if (controlsDiv) {
        controlsDiv.classList.remove('disabled');
    }
};

const disableControls = () => {
    if (controlsDiv) {
        controlsDiv.classList.add('disabled');
    }
};

const renderControls = () => {
    if (tavolo.state.isMyTurn === true) {
        enableControls();
    } else {
        disableControls();
    }
};