"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../../common/route");
const usersModel_1 = require("./usersModel");
class UsersRouter extends route_1.Router {
    applyRoutes(application) {
        const URL = '/user/';
        application.get(`${URL}list`, (req, resp, next) => {
            usersModel_1.User.find()
                .then((users => {
                resp.json(users);
                return next();
            }))
                .catch(() => {
                resp.status(404);
                resp.json({
                    messagen: "File not found!"
                });
                return next();
            });
        });
        application.post(`${URL}register`, (req, resp, next) => {
            let user = new usersModel_1.User(req.body);
            user.save()
                .then(() => {
                resp.json({
                    messagen: user
                });
                return next();
            })
                .catch(e => {
                resp.send(500);
                return next();
            });
        });
        application.del(`${URL}delete/:id`, (req, resp, next) => {
            usersModel_1.User.deleteOne({ _id: req.params.id }).then(function () {
                resp.json({
                    messagen: "Deleted success"
                });
                return next();
            }).catch(function (error) {
                resp.json({
                    messagen: "Does not exist"
                });
                return next();
            });
        });
        application.put(`${URL}:id`, (req, resp, next) => {
            const options = { overwrite: true };
            usersModel_1.User.updateOne({ _id: req.params.id }, { $set: req.body }).then(user => {
                usersModel_1.User.findById(req.params.id).exec().then((user) => {
                    resp.json({
                        messagen: user
                    });
                    return next();
                });
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
