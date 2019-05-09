'use strict';
require('dotenv').config();
const express       = require('express');
const bodyParser    = require('body-parser')
const mongoDB       = require('./config/mongoose');
const path          = require('path');
const passport      = require('passport');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const flash         = require('connect-flash');
const app = express();
mongoDB.mmongoConn()
.then(()=>{
    console.log('Connected to mongo database....');
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    // parse application/json
    app.use(bodyParser.json());

    app.set('view engine','ejs');
    app.set('views',path.join(__dirname,'views'));
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    //Required for passport
    app.set('trust proxy', 1)
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }))
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(flash()); // use connect-flash for flash messages stored in session
    require('./config/passport')(passport); // pass passport for configuration

    app.use(function (req, res, next) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if (req.user) {
            res.locals.name = req.user.name;
        } else {
            res.locals.name = "";
        }
        next();
    });
    //Routes includes
    require('./routes')(app);

    //Server Running Port
    app.listen(process.env.PORT || process.env.DEV_PORT, function () {
        console.log('--Server Running Port ' + process.env.DEV_PORT);
    });

})
.catch((err)=>{
    console.log(err);
})