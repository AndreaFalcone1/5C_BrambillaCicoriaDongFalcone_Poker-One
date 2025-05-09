import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js"
import { createLoginHandler } from "./frontend/components/createLoginHandler.js"
import { createForm } from "./frontend/components/createForm.js"

//
//  Binding
//

const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

const divForm = document.getElementById("divFormLoginRegister");

//
//  Vars
//

const socket = io();

const loginHandling = createLoginHandler(socket);
const registerHandling = createRegisterHandler(socket);

const form = createForm(divForm);

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



