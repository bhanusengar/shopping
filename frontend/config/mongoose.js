'use strict'

const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const mongoDBUrl = "mongodb+srv://bhanudb:" + process.env.DB_PASSWORD + "@cluster0-zlhjm.mongodb.net/test?retryWrites=true";

let mmongoConn = function(){
    mongoose.connect(mongoDBUrl,{
        useCreateIndex: true,
        useNewUrlParser: true
    })

    return new Promise((resolve,reject)=>{
        mongoose.connection.on('error', (err) => {
            if (err) {
                reject(err);
            }
        });
        mongoose.connection.once('open', function () {
            resolve();
        });
    })
}

module.exports = {mmongoConn};