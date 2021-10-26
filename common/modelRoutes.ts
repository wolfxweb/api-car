import { Router } from './route'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'
import * as restify from "restify"


export abstract class ModelRouter<D extends mongoose.Document> extends Router {




    constructor(protected model: mongoose.Model<D>) {
        super()
    }

    validateId = (req: restify.Request, resp: restify.Response, next: restify.Next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
          next(new NotFoundError('Document not found'))
        }else{
          next()
        }
      }
    findAll = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        this.model.find()
            .then(this.render(resp, next))
            .catch(next)
    }


    save = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
            .catch(next)
    }

    delete =(req: restify.Request, resp: restify.Response, next: restify.Next) => {
       this.model.deleteOne({ _id: req.params.id })
            .then(function () {
                resp.json({
                    messagen: "Deleted success"
                })
                return next()
            })
            .catch(next)
    }

    update = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        const options = {runValidators: true, new : true}
       this.model.findOneAndUpdate(req.params.id, req.body, options)
            .then(this.render(resp, next))
            .catch(next)

    }



}