const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./configs/config_fb');
const routes = require('./routes/fbAuth');
const app = express();

// Passport session setup. 
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret: config.facebook_secret,
    callbackURL: config.callback_url
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            console.log("this is profile", profile);
            return done(null, profile);
        });
    }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // sử dụng view ejs
app.use(express.static('public'))
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    key: 'sid',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000, () => {
    console.log('Login service is running on http://localhost:', 3000)
});