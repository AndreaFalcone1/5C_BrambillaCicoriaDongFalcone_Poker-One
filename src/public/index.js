import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js"
import { createLoginHandler } from "./frontend/components/createLoginHandler.js"
import { createForm } from "./frontend/components/createForm.js"
import { createUserList } from "./frontend/components/createUserList.js";
import { createTableList } from "./frontend/components/createTableList.js";

location.href="#welcome";

//
//  Binding
//

const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

const divForm = document.getElementById("divFormLoginRegister");

const navigator = createNavigator(document.getElementById('bodyContainer'));

//
//  Vars
//

const form = createForm(divForm);

const socket = io();


const loginHandling = createLoginHandler(socket);
const registerHandling = createRegisterHandler(socket);

//
//
//

loginButton.onclick = function() {
    
    form.build("login");

    form.onSubmit(function (dict) {
        console.log(loginHandling.loginSender(dict.email, dict.password));
        loginHandling.loginReciver();
        
        document.getElementById('navbar').classList.remove('hidden');
        divForm.classList.add('hidden');
        location.href='#lobby';

        //creazione tabella dati personali nel div area personale
        const personalInfosDiv = document.getElementById('personalInformations');

        let html = '<table>';

        html += '</table>';
        personalInfosDiv.innerHTML = html;
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

const userList = createUserList(socket);
const tableList = createTableList(socket);

socket.on("connect", () => {
    socket.emit("connessioneIniziale", {
        username: "nomeut", 
        table: 0,
    });
    socket.username = "nomeut";

    loginHandling.loginReciver();
    userList.getOnlineUsers();
    userList.waitingInvites();
    tableList.getTableList();
});
