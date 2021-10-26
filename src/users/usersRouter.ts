import * as restify from "restify"
import {ModelRouter } from "../../common/modelRoutes";

import { User } from "./usersModel"

import {authenticate} from '../../security/authHandler'
import { authValidate} from '../../security/authValidate'
class UsersRouter extends  ModelRouter<User> {



    constructor() {
        super(User)
        this.on('beforRender', document => {
            document.password = undefined
        })
    }


    applyRoutes(application: restify.Server) {

        const URL = '/users/';

        application.get(`${URL}list`,this.findAll)

        application.post(`${URL}register`, this.save)

        application.del(`${URL}delete/:id`, [ this.validateId, this.delete])

        application.patch(`${URL}:id`, [this.validateId, this.update])
        

        application.post(`${URL}login`, authenticate)
    
    }

}

export const usersRouter = new UsersRouter()