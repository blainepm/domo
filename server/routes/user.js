var express = require('express');
var passport = require('passport');
var User = require(__base + 'models/user');
var router = express.Router();



router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.login }), req.body.password, function(err, account) {
        if (err) {
            return res.json('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.json(account);
        });
    });
});

router.get('/account', function(req, res) {
    res.json(req.user);
});

router.post('/authentication', passport.authenticate('local'), function(req, res) {
    res.json({ message: "Authenticated" });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json('/');
});


module.exports = router;
