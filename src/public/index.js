import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js"
import { createLoginHandler } from "./frontend/components/createLoginHandler.js"
import { createForm } from "./frontend/components/createForm.js"
import { createUserList } from "./frontend/components/createUserList.js";

//
//  Binding
//

const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

const divForm = document.getElementById("divFormLoginRegister");

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

socket.on("connect", () => {
    socket.emit("connessioneIniziale", {
        username: "nomeut", 
        table: 0,
    });

    loginHandling.loginReciver();
    userList.getOnlineUsers();
    userList.waitingInvites();
});
