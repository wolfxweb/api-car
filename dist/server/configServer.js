"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
class configServer {
    initRoutes(routes) {
        return new Promise((resolve, reject) => {
            try {
                // bd
                var mongodb = mongoose.connect(environment_1.environment.db.url);
                mongodb.then(response => {
                    console.log('Conectado com mongo DB ');
                }).catch(e => {
                    console.log('Error ao conectar com mongo DB');
                    reject(e);
                    process.exit(1);
                });
                this.application = restify.createServer({
                    name: environment_1.environment.name_api.name,
                    version: environment_1.environment.version_api.version
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                for (let router of routes) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routes = []) {
        return this.initRoutes(routes).then(() => this);
    }
}
exports.configServer = configServer;
