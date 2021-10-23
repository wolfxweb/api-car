import { configServer} from "./server/configServer";

import  {usersRouter }from "./src/users/usersRouter"

const server = new configServer()

server.bootstrap([
    usersRouter 
]).then((server:any)=>{
    console.log('Api esta rodadno no endereço: ', server.application.url)
}).catch(e=>{
    console.log('Falha iniciar api ', e)
    process.exit(1)
})