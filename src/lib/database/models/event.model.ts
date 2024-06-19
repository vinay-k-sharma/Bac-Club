
import { Schema,model,models } from "mongoose";


const EventSchema = new Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    organizer: {type:Schema.Types.ObjectId,ref:'User'},
    thumbnail:{type:String,required:true,unique:true},
    createdAt:{type:Date,default:Date.now},
    startDate : {type:Date,default:Date.now},
    endDate : {type:Date,default:Date.now},
    images : [{type:String}]
})

const Event = models.Event || model('Event',EventSchema)

export default Event