"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
class configServer {
    initializeDb() {
        return __awaiter(this, void 0, void 0, function* () {
            var mongodb = yield mongoose.connect(environment_1.environment.db.url);
            return new Promise((resolve, reject) => {
                try {
                    resolve(mongodb);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    initRoutes(routes) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: environment_1.environment.name_api.name,
                    version: environment_1.environment.version_api.version
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                for (let router of routes) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => { resolve(this.application); });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routes = []) {
        return this.initializeDb().then(() => this.initRoutes(routes).then(() => this));
    }
}
exports.configServer = configServer;
