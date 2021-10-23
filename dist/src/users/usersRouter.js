"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../../common/route");
const usersModel_1 = require("./usersModel");
class UsersRouter extends route_1.Router {
    applyRoutes(application) {
        application.get('/login', (req, resp, next) => {
            resp.json({
                messagen: 'LOGIN'
            });
            return next();
        });
        application.post('/login/register', (req, resp, next) => {
            let user = new usersModel_1.User(req.body);
            user.save().then(() => {
                resp.json({
                    messagen: user
                });
            });
            return next();
        });
    }
}
exports.usersRouter = new UsersRouter();
