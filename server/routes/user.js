var express = require('express');
var passport = require('passport');
var User = require(__base + 'models/user');
var router = express.Router();



router.post('/register', function(req, res) {
    User.register(new User(
        {
            username    : req.body.login,
            email       : email,
            authorities : ['ROLE_USER'],
            active      : false,
            langKey     : req.body.langKey
        }
    ), req.body.password, function(err, account) {

        if (err) {
            console.log('error!!!!!!!!!!!!!!');
            return res.json('register', { account : account });
        }

        res.json();

        // passport.authenticate('local')(req, res, function () {
        //     console.log('ok!!!!!!!!!!!!!!');
        //     res.json(account);
        // });
    });
});

router.get('/account', function(req, res) {
    if ( !req.user || !req.user.active) {
        return res.status(401).send({info : "user does not exist."});
    }

    res.json(req.user);
});

router.post('/account', function(req, res) {
    // console.log(res.body);
    if ( !req.user) {
        return res.status(401).send({info : "user does not exist."});
    }

    var content = '';

    req.on('data', function (data) {
        // Append data.
        content += data;
    });

    req.on('end', function () {
        // Assuming, we're receiving JSON, parse the string into a JSON object to return.
        var data = JSON.parse(content);

        User.update(req.user, { $set: data}, {}, function() {
            res.json(req.user);
        });
    });

});

// router.post('/authentication', passport.authenticate('local'), function(req, res) {
//     res.json({ message: "Authenticated" });
// });

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
