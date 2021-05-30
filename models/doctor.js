var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var Doctor = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:Number,
    cnic: {
        type: Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pmdc:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
    },
    experience:{
        type:String,
    },
    verify:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Doctor', Doctor);