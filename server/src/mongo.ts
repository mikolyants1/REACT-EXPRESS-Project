import mongoose,{Error, Schema} from "mongoose";
import env from './env.js'

 mongoose.connect(`${env}`)
 .then(()=>console.log("connect db"))
 .catch((err:Error)=>console.log(err));

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
    id:{
     type:Number,
     required:true
    },
    name:{
     type:String,
     required:true
    },
    pass:{
     type:String,
     required:true
    },
    message:{
    type:[MessageSchema],
    required:true
    } 
});

export const User = mongoose.model("User",UserSchema);
