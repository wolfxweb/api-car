import * as restify from "restify"
import { Router } from "../../common/route";

import {User} from "./usersModel"



class UsersRouter extends Router{

  
    applyRoutes(application:restify.Server){

        application.get('/login', (req: restify.Request, resp: restify.Response, next: restify.Next) => {

            resp.json({
                messagen: 'LOGIN'
            })
            return next()

        })
        application.post('/login/register', (req: restify.Request, resp: restify.Response, next: restify.Next) => {

            let user = new User(req.body)
            user.save().then(()=>{
                resp.json({
                    messagen: user
                })

            })


            

        
            return next()

        })
    }

}

export const usersRouter = new UsersRouter()