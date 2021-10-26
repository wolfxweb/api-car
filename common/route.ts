import * as restify from "restify"
import { NotFoundError } from "restify-errors"
import {EventEmitter} from 'events'


export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server)

    render(response:restify.Response , next:restify.Next){
        return (document)=>{
            if(document){
              
                if(!document.resetPassword){
                    document.resetPassword = undefined
                }
                console.log(document)
                this.emit('beforRender',document) // emit evento para tira passoword da redenrização
                response.json(document)
            }else{
               throw new  NotFoundError('Documento não encontrado')
            }
        }
    }
}