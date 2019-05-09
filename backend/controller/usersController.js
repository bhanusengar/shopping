'use strict'

const userModel = require('../model/usersmodel');

class UserController{

    createUser(dataSet) {
        return new Promise((resolve,reject)=>{
            let usersave = new userModel(dataSet);
            usersave.save((err,docs)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(docs)
                }
            })
        })
    }
}

module.exports = UserController;