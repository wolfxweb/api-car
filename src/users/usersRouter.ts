import * as restify from "restify"
import { Router } from "../../common/route";

import { User } from "./usersModel"



class UsersRouter extends Router {


    applyRoutes(application: restify.Server) {

        const URL = '/user/';
        application.get(`${URL}list`, (req: restify.Request, resp: restify.Response, next: restify.Next) => {

            User.find()
                .then((users => {
                    resp.json(users)
                    return next()
                }))
                .catch(() => {
                    resp.status(404)
                    resp.json({
                        messagen: "File not found!"
                    })
                    return next()
                })
        })
        application.post(`${URL}register`, (req: restify.Request, resp: restify.Response, next: restify.Next) => {

            let user = new User(req.body)
            user.save()
                .then(() => {
                    resp.json({
                        messagen: user
                    })
                    return next()
                })
                .catch(e => {
                    resp.send(500)
                    return next()
                })
        })
        application.del(`${URL}delete/:id`, (req: restify.Request, resp: restify.Response, next: restify.Next) => {

            User.deleteOne({ _id: req.params.id }).then(function () {
                resp.json({
                    messagen: "Deleted success"
                })
                return next()
            }).catch(function (error) {
                resp.json({
                    messagen: "Does not exist"
                })
                return next()
            });
        })

        application.put(`${URL}:id`, (req: restify.Request, resp: restify.Response, next: restify.Next) => {
            const options = { overwrite: true }
            User.updateOne({ _id: req.params.id }, { $set: req.body }).then(user => {
                User.findById(req.params.id).exec()
                    .then((user) => {
                        resp.json({
                            messagen: user
                        })
                        return next()
                    })
                    .catch(function (error) {
                        resp.json({
                            messagen: "Failed to update"
                        })
                        return next()
                    });

            })

        })
    }

}

export const usersRouter = new UsersRouter()