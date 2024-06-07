import { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
    title: {type:String,required:true,unique:true},
    description: {type:String,required:true},
    thumbnail: {type:String,required:true,unique:true},
    category: {type:String,required:true,unique:true},
    organizer: {type:Schema.Types.ObjectId,ref:'User'},
    users : [{type:Schema.Types.ObjectId,ref:'User'}],
    events : [{type:Schema.Types.ObjectId,ref:'Event'}]
})
const Club = models.Club || model('Club',ClubSchema)

export default Club