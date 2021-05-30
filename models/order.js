var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    date:{
        type:Date,
        default:Date.now
    },
    description: {
        type: String,
    },
    OrderFrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    status:{
        type:String
    }
});

module.exports = mongoose.model('Order', OrderSchema);
