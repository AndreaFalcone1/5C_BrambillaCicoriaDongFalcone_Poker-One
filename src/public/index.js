import { createNavigator } from "./frontend/components/createNavigator.js";
import { createRegisterHandler } from "./frontend/components/createRegisterHandler.js"
import { createLoginHandler } from "./frontend/components/createLoginHandler.js"
import { createUserList } from "./frontend/components/createUserList.js";

//
//  Binding
//

const login = document.getElementById("login");
const register = document.getElementById("register");

//
//  Vars
//

const socket = io();

const loginHandling = createLoginHandler(socket);
const registerHandling = createRegisterHandler(socket);
const userList = createUserList(socket);
//console.log(registerHandling.registerSender('falconeandrea@itis-molinari.eu', 'xXSaraCinescaXx', 'Sara', 'Cinesca', '10/02/2000'));
//registerHandling.registerReciver();

loginHandling.loginReciver();
userList.getOnlineUsers();
