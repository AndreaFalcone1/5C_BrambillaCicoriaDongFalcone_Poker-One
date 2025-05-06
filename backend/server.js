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

import { register } from "module";
//
//  Modules
//

import { createRegisterHandler } from "./components/register/createRegisterHandler.js";

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
const server = http.createServer(app);
const io = new Server(server);

//
//  Listeners
//

io.on('connection', (socket) => {
    
    //Register
    const registerHandler  =  createRegisterHandler(socket);
    registerHandler.registerReciver();

    //

});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});