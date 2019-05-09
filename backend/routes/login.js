'use strict'
const express = require('express');
const usersController = require('../controller/usersController');
const passport = require('passport');
const userCtrl = new usersController()
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        message: req.flash('loginMessage')[0]
    });
});
router.post('/doLogin', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/'); //Can fire before session is destroyed?
});

module.exports = router;