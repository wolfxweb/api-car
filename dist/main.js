"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configServer_1 = require("./server/configServer");
const usersRouter_1 = require("./src/users/usersRouter");
const server = new configServer_1.configServer();
server.bootstrap([
    usersRouter_1.usersRouter
]).then((server) => {
    console.log('Api esta rodadno no endereço: ', server.application.url);
}).catch(e => {
    console.log('Falha iniciar api ', e);
    process.exit(1);
});
