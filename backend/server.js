//
//  Libraries
//

const fs = require('fs');
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require('socket.io'); 
const conf = JSON.parse(fs.readFileSync("./conf.json"));

//
//  Modules
//

const { createRegisterHandler } = require("./components/register/createRegisterHandler.js");
const { createUserList } = require("./components/userList/userList.js");

//
//  Code
//

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Qui c'è un problema, il path è giusto ma non prende i file perché sono in cartelle diverse
app.use("/", express.static(path.join(__dirname, "../public/")));
const server = http.createServer(app);
const io = new Server(server);

//
//  Listeners
//

// Online users
let users = []

io.on('connection', (socket) => {
    //Register
    const registerHandler  =  createRegisterHandler(socket);
    registerHandler.registerReciver();

    //UserList
    const userList = createUserList(socket, users)
    userList.setOnlineUsers()

});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});