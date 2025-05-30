//
//  Libraries
//

const mysql = require('mysql2');
const fs = require('fs');
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require('socket.io'); 
const conf = JSON.parse(fs.readFileSync("src/conf/conf.json"));
const nodemailer = require("nodemailer");

require('dotenv').config({
  path: "src/conf/.env"
})

//
//  Modules
//

const createRegisterHandler = require("./backend/components/createRegisterHandler.js");
const createLoginHandler = require("./backend/components/createLoginHandler.js");
const createUserList = require("./backend/components/createUserList.js");
const createMailer  = require("./backend/components/createMailer.js");
const createDatabase  = require("./backend/components/createDatabase.js");
const createTableList = require("./backend/components/createTableList.js");
const createTable = require("./backend/components/createTableHandler.js");

//
//  Code
//

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "../node_modules")));

const server = http.createServer(app);
const io = new Server(server);

//
//  Listeners
//

// Online users
let users = []

// Table
let currentTables = [[]];

const mailer = createMailer(nodemailer);

const database = createDatabase(mysql);
database.build();

io.on('connection', (socket) => {

    //Register
    const registerHandler = createRegisterHandler(socket);
    registerHandler.registerReciver(database, mailer);

    //Login
    const loginHandler = createLoginHandler(socket, users);
    loginHandler.loginReciver(database);

    // Userlist
    const userList = createUserList(io, socket, users);
    userList.setOnlineUsers();
    userList.inviteSender();

    // Tablelist
    const tableList = createTableList(socket, currentTables, users);
    tableList.setTable()

});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});