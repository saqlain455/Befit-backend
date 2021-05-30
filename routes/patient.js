var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Patient=require('../models/patient');
var Doctor=require('../models/doctor');
var Shop=require('../models/MedicineShop');
var Order=require('../models/order');
var Blog=require('../models/blog');
var Appointment=require('../models/appointment');
//Get

router.get('/',authenticate.verifyUser, function(req, res, next) {
        res.json('Patient dashboard');
});


router.get('/doctors',authenticate.verifyUser, function(req, res, next) {
    Doctor.find({verify:true}).sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/doctors/:city',authenticate.verifyUser, function(req, res, next) {
 //   res.send('respond with a search doctor with city name');
    Doctor.find({city:req.params.city}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/blog', function(req, res, next) {
    //res.send('respond with a total no of blogs');
    Blog.find({}).populate('poster').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});



//Post
router.post('/BookAppointment',authenticate.verifyUser, function(req, res, next) {
    Appointment.create(req.body)
    .then((data) => {
        console.log('appointment created ', data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/OrderMedicine',authenticate.verifyUser, function(req, res, next) {
    Order.create(req.body)
    .then((data) => {
        console.log('Order send', data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//Puts
router.put('/addcomment/:blogid',authenticate.verifyUser,function(req,res,next){
    Blog.findOneAndUpdate({ _id: req.params.blogid }, {
        "$push": {
            "comments": {
                "body": req.body.body
            }
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });     
})


//post

// router.post('/createdoctor',authenticate.verifyUser,function(req,res,next){
//     console.log(req.body.name);
//     Doctor.create(req.body)
//         .then((doctor) => {
//             console.log('doctor has been Added ', doctor);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(doctor);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });




//Delete
router.delete('/delappointment/:id',authenticate.verifyUser,function(req,res,next){
    Appointment.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});



module.exports = router;