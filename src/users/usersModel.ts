import * as mongoose from "mongoose"


export interface User extends mongoose.Document{
    name:string,
    email:String,
    password:String,
    timestamp:Date,
    resetPassword:String,
    state:boolean

}

const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String,
      
    },
    password:{
        type:String,
        select: false
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    resetPassword:{
        type:String,
        default:null,
        select: false
        
    },
    state:{
        type:Boolean,
        default:true
    }
})

export const User = mongoose.model<User>('User',userSchema)