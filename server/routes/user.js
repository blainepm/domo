var express = require('express');
var passport = require('passport');
var User = require(__base + 'models/user');
var router = express.Router();


router.post('/register', function(req, res) {

    User.register(new User(
        {
            username    : req.body.login,
            email       : req.body.email,
            authorities : ['ROLE_USER'],
            active      : false,
            langKey     : req.body.langKey
        }
    ), req.body.password, function(err, account) {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).json();
    });
});


router.post('/account/change_password', function(req, res, next) {

    User.findByUsername(req.user.username).then(function(sanitizedUser){
        if (sanitizedUser){
            sanitizedUser.setPassword(req.body.password, function(){
                sanitizedUser.save();
                return res.status(200).json({msg: 'password reset successful'});
            });
        } else {
            res.status(200).json({status: 0, msg: 'This user does not exist'});
        }
    },function(err){
        console.log(err);
    })
});

router.get('/account/sessions', function(req, res, next) {
    res.status(200).json({msg: req.session});
});

router.get('/account', function(req, res) {

    if ( !req.user || !req.user.active) {
        return res.status(401).send({info : "user does not exist."});
    }

    res.status(200).json(req.user);
});


router.post('/account', function(req, res) {
    if ( !req.user) {
        return res.status(401).send({info : "user does not exist."});
    }

    User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, place) {
        res.json(place);
    });
});


router.post('/authentication',function(req, res, next) {

    passport.authenticate('local', function(err, user, info){

        if ( err ) { return next(err); }

        if ( !user || !user.active) {
            return res.status(401).send({info : "user does not exist."});
        }

        req.logIn(user, function(err) {

            if (err) {
                return res.status(401).send({info : "loggin failed."});
            }

            return res.json();

        });

    })(req, res, next);

});


router.get('/logout', function(req, res) {
    req.logout();
    res.json();
});


module.exports = router;
