import * as restify from "restify"
import * as mongoose from "mongoose"
import * as corsMiddleware from 'restify-cors-middleware'

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

                const headers =  'Accept, Accept-Version, Content-Type, Api-Version, Origin, X-Requested-With, '
                                + 'Authorization, Withcredentials, X-Requested-With, X-Forwarded-For, X-Real-Ip, '
                                + 'X-Customheader, User-Agent, Keep-Alive, Host, Accept, Connection, Upgrade, '
                                + 'Content-Type, If-Modified-Since, Cache-Control';
                const cors = corsMiddleware({
                    preflightMaxAge:10,
                    origins: ['*'],
                    allowHeaders: [
                      headers
                    ],
                    exposeHeaders: ['x-custom-header']
                });

                this.application = restify.createServer({
                    name: environment.name_api.name,
                    version: environment.version_api.version
                })
              

                  this.application.pre(cors.preflight);
                  this.application.use(cors.actual);
                /*

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge:10,
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                }
                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

                this.application.pre(cors.preflight)

                this.application.use(cors.actual)



                */
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())


                for (let router of routes) { router.applyRoutes(this.application) }

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