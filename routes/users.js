var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
router.use(bodyParser.json());
var Doctor=require('../models/doctor')
/* GET users listing. */
router.get('/',authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
    User.find({})
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                if (req.body.email)
                    user.email = req.body.email;
                if (req.body.role){
                    user.role = req.body.role;
                }
                // if(req.body.role=="admin"){
                //     user.admin=true;
                // }
                // else{
                //     user.admin=false;
                // }
                // if(req.body.role=="doctor"){
                //     user.doctor=true;
                // }
                // else{
                //     user.doctor=false;
                // }
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return user;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
            }
        });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!',user:req.user });
});

router.post('/createdoctor',authenticate.verifyUser,function(req,res,next){
    console.log(req.body.name);
    Doctor.create(req.body)
        .then((doctor) => {
            console.log('doctor has been Added ', doctor);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(doctor);
        }, (err) => next(err))
        .catch((err) => next(err));
});




router.get('/auth/facebook', passport.authenticate('facebook',{session:false},{scope:'email'}));

router.get('/auth/facebook/callback',
 passport.authenticate('facebook', { successRedirect: '/success', 
failureRedirect: '/faliure' }));

router.get('/success',(req,res)=>{
    res.send('u are valid user !')
})
router.get('/faliure',(req,res)=>{
    res.send('u are not valid user !')
})



router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;