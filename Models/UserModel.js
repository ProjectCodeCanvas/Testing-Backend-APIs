import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    isPrimeUser:{
        type:Boolean,
        default:false,
    },
    followers:[],
    followings:[],
    uploads:[],
    noOfStars:{
        type:Number,
        default:0
    }


   
}, { timestamps: true });

mongoose.models = {};

export const UserModel = mongoose.model("UserModel", schema);