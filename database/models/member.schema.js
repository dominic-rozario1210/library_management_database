import mongoose from "mongoose"

const memberSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        phone:{
            type:String,
            required:true,
            unique:true
        }
    }
)

const Member = mongoose.model("member",memberSchema)

export default Member