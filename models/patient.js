var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var Patient = new Schema({
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
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    Dob:{
        type:Date
    },
    Age:{
        type:Number
    }
});

module.exports = mongoose.model('Patient', Patient);