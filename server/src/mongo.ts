import mongoose,{Schema} from "mongoose";
import env from './env.js'

 mongoose.connect(`${env}`)
 .then(()=>console.log("connect db"))
 .catch((err)=>console.log(err));

const MessSchema = new Schema({
    text:String,
    date:String,
    now:Number,
    day:Number,
    month:String
});

const MessageSchema = new Schema({
    id:Number,
    mess:[MessSchema]
});

const UserSchema = new Schema({
    id:Number,
    name:{
     type:String,
     required:true
    },
    pass:{
     type:String,
     required:true
    },
    message:[MessageSchema]
});

export const User = mongoose.model("User",UserSchema);
