import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js"
import { createLoginHandler } from "./frontend/components/createLoginHandler.js"
import { createForm } from "./frontend/components/createForm.js"
import { createUserList } from "./frontend/components/createUserList.js";
import { createTableList } from "./frontend/components/createTableList.js";
import { createTavolo } from "./frontend/components/createTavolo.js";

location.href="#welcome";

//
//  Binding
//

const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

const divForm = document.getElementById("divFormLoginRegister");

const newTableButton = createTavolo(document.getElementById("newTable"));

//
//  Vars
//

const form = createForm(divForm);

const socket = io();

const loginHandling = createLoginHandler(socket);
const registerHandling = createRegisterHandler(socket);

const navigator = createNavigator(document.getElementById('bodyContainer'));

let userData ;

//
//
//

loginButton.onclick = function() {
    
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
                //da sistemare
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
            } else {
                document.getElementById('errorDiv').classList.remove('hidden');
            }
        });
    });
    
    

    form.render();
    
}

registerButton.onclick = function() {
    
    form.build("register");
    
    form.onSubmit(function (dict) {
        console.log(registerHandling.registerSender(dict.email, dict.username, dict.name, dict.surname, dict.date));
        registerHandling.registerReciver();
    })  

    form.render();

}

form.render();

newTableButton.onclick = function() {
    if (!userData) {
        console.error("Nessun utente connesso. Impossibile creare un nuovo tavolo.");
        return;
    }
    const nomeTavolo = userData.username + "'s Tavolo"; 
    const datiNuovoTavolo = {
        nome: nomeTavolo,
        creatore: userData.username
    };
    socket.emit("creaNuovoTavolo", datiNuovoTavolo, function(response) {
        if (response && response.success) {
            console.log("Nuovo tavolo creato con successo:", response.data);
            tableList.getTableList();
        } else {
            console.error("Creazione del nuovo tavolo fallita:", response.message);
        }
    });
}

