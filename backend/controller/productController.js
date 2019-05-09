'use strict'

const productModel = require('../model/productsmodel');

class Product{

    saveProduct(productDataset, filesData) {
         var finalImageData = [];
         var productSaveData;
          var productImagesData = {};
         if (filesData.length > 0) {
             filesData.forEach(elem => {
                 productImagesData.fileName = elem.originalname;
                 productImagesData.file = elem.filename;
             });
         }
         let discountPriceCalculate = parseFloat(productDataset.productPrice) - (parseFloat(productDataset.productPrice) * parseFloat(productDataset.productDiscount / 100))
         productSaveData = {
             productName: productDataset.productName,
             gender: productDataset.gender,
             productPrice: productDataset.productPrice,
             discountPrice: discountPriceCalculate,
             productDiscount: productDataset.productDiscount,
             productImage: productImagesData
         }
        return new Promise((resolve,reject)=>{
            let productData = new productModel(productSaveData);
            productData.save((err, doc) => {
                (err) ? reject(err): resolve(doc)
            });
        })
    }

    getAddProduct(query){
		return new Promise((resolve,reject)=>{
		  productModel.find(query,(err,doc)=>{ (err)? reject(err) : resolve(doc) })
		})
    }
     updateProductData(where, dataSet) {
        let discountPriceCalculate = parseFloat(dataSet.productPrice) - (parseFloat(dataSet.productPrice) * parseFloat(dataSet.productDiscount / 100))
        let updatedProduct = {
            productName: dataSet.productName,
            gender: dataSet.gender,
            productPrice: dataSet.productPrice,
            discountPrice: discountPriceCalculate,
            productDiscount: dataSet.productDiscount
        }

         return new Promise((resolve, reject) => {
             productModel
                 .where(where)
                 .update(updatedProduct)
                 .exec((err, doc) => {
                     (err) ? reject(err): resolve(doc)
                 })
         })
     }
     deleteProductData(where) {
         return new Promise((resolve, reject) => {
             productModel
                 .remove(where, (err, doc) => {
                     (err) ? reject(err): resolve(doc)
                 });
         })
     }
}

module.exports = new Product();