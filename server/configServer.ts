import * as restify from "restify"
import * as mongoose from "mongoose"
import { environment } from "../common/environment"

import { Router } from "../common/route"

export class configServer {

    application: restify.Server

    async initializeDb(): Promise<any> {
        var mongodb = await mongoose.connect(environment.db.url)
        return new Promise((resolve, reject) => {
            try {
                resolve(mongodb)

            } catch (error) {
                reject(error)
            }
        })
    }

    initRoutes(routes: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: environment.name_api.name,
                    version: environment.version_api.version
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())


                for (let router of routes) {router.applyRoutes(this.application)}

                this.application.listen(environment.server.port, () => { resolve(this.application) })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routes: Router[] = []): Promise<any> {
        return this.initializeDb().then(() => this.initRoutes(routes).then(() => this))
    }



}