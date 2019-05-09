'use strict'

var express = require('express');
var multer  = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads/');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }

})


var upload = multer({ storage: storage })

module.exports = upload;
