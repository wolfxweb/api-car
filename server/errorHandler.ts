import * as restify from "restify"

export const errorHandler = (req: restify.Request, resp: restify.Response, err, done) => {

   console.log( err.name)

    err.toJson = () => {
        return {
            message: err
        }
    }
    switch (err.name) {
        case 'MongoServerError':
            if (err.code === 11000) {
                err.statusCode = 400
            }
            break
        case 'ValidationError':
            err.statusCode = 400
            let msg: any[] = []
            for(let name in err.errors){ msg.push({message: err.errors[name].message})}
            err.toJson = () => {
                return {
                    message: msg
                }
            }
            break

    }
    done()



}