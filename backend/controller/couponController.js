'use strict'

const couponmodel = require('../model/couponmodel');

class CouponModel {
  saveData(dataSet){
    return new Promise((resolve,reject)=>{
        let couponSet = new couponmodel(dataSet);
        couponSet.save((err,doc)=>{ (err)? reject(err):resolve(doc)});
    })
  }
  getData(query){
    return new Promise((resolve,reject)=>{
      couponmodel.find(query,(err,doc)=>{ (err)? reject(err) : resolve(doc) })
    })
  }
  updateData(where,dataSet){
      return new Promise((resolve,reject)=>{
          couponmodel
          .where(where)
          .update(dataSet)
          .exec((err,doc)=>{ (err)? reject(err):resolve(doc) })
      })
  }
  deleteData(where){
    return new Promise((resolve,reject)=>{
        couponmodel
        .remove(where,(err,doc)=>{ (err)?reject(err):resolve(doc) });
    })
  }
}

module.exports = new CouponModel();
