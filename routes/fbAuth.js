const express = require('express')
const router = express.Router();
const passport = require('passport')


// let user = null;
// router.get('/', function (req, res) {
//     res.render('index', { user: req.user || user });
// });

// router.get('/login', function (req, res) {
//     res.render('login')
// });

router.get('/account', ensureAuthenticated, function (req, res) {
    res.json({
        success: true,
        account: req.user
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
)

router.get('/logout', function (req, res) {
    if (req.user) {
        req.logout();
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            message: ' you must login '
        }
    }

});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.json({
        message: " you must login"
    })
}