import * as restify from "restify"
import * as mongoose from "mongoose"
import { environment } from "../common/environment"

import { Router } from "../common/route"

export class configServer {

    application: restify.Server
   
    initRoutes(routes: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                // bd
                var mongodb = mongoose.connect(environment.db.url)
                mongodb.then(response => {
                    console.log('Conectado com mongo DB ')
                }).catch(e => {
                    console.log('Error ao conectar com mongo DB')
                    reject(e)
                    process.exit(1)
                })
                this.application = restify.createServer({
                    name: environment.name_api.name,
                    version: environment.version_api.version
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())


                for (let router of routes) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                    
                })

            } catch (error) {
                reject(error)
            }
        })
    }
    bootstrap(routes: Router[] = []): Promise<any> {
        return this.initRoutes(routes).then(() => this)
    }



}