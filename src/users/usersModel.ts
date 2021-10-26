import * as mongoose from "mongoose"
import * as bcrypt from 'bcrypt'

import {environment} from '../../common/environment'

export interface User extends mongoose.Document{
    name:string,
    email:String,
    password:String,
    timestamp:Date,
    resetPassword:String,
    state:boolean,
    profiles: string[],
    matches(password: string): boolean,
    hasAny(...profiles:string[]):boolean // utilizado sprad operador para não ficar montado array durante o envio

}
export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
  }

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
        minlength: 3
    },
    email:{
        type:String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password:{
        type:String,
        select: false,
        required:true,
        minlength: 6,
       
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    resetPassword:{
        type:String,
        select: false,
        default:null,
        
    },
    state:{
        type:Boolean,
        default:true
    },
    obs:{
        type:String,
        required:false
    },
    profiles :{
        type: [String],
        default:'user',
        required:false
      }
})

userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection) //seleciona cadastro pelo email
}

userSchema.methods.matches = function(password:string):Boolean{
    return bcrypt.compareSync(password, this.password)//verifica se a senha informada e igual a salva no banco de dados
}
userSchema.methods.hasAny = function(...profiles: string[]) : boolean{
    /** some retorna true se exixtir  */
    return profiles.some(profile => this.profiles.indexOf(profile)!== -1)

}
/** criar has passowrd */
const hashPassword =(obj, next)=>{
    console.log('obj',obj)
    bcrypt.hash(obj.password,environment.security.saltRounds)
    .then( hash=>{
        obj.password= hash
        next()
    })
    .catch(next)
}
const saveMiddleware  =function(next){
    const user:User = this // referencia para manter o this para o documento em questão
    !user.isModified('password')?next():   hashPassword(user, next) 
}

const upadateMiddleware = function(next){
    !this.getUpdate().password? next():  hashPassword(this.getUpdate(), next) 
}

userSchema.pre('save', saveMiddleware )

userSchema.pre('findOneAndUpdate', upadateMiddleware )

export const User = mongoose.model<User, UserModel>('User',userSchema)