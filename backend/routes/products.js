'use strict'

const express           = require('express');
const productController = require('../controller/productController');
const router            = express.Router();
const { check, validationResult } = require('express-validator/check');
const fileUpload        = require('../middleware/fileUpload');

router.get('/',(req,res,next)=>{
    productController.getAddProduct()
        .then((docs) => {
            res.render('products/index', {
                docs
            });
        })
        .catch((err) => {
            console.log(err.message);
        })
})

router.get('/add-product',(req,res,next)=>{
    res.render('products/add_product', {
    	validationError: req.flash('validationError')
    });
});

router.post('/doAddProduct',  fileUpload.array('productImage', 1), (req, res, next) => {
		
	let productDataset = req.body;
	let filesData = req.files;
	productController.saveProduct(productDataset, filesData)
		.then((docs) => {
			res.redirect('/products');
		})
		.catch((err) => {
			console.log(err.message)
		})
	 
})

router.get('/edit-product/:id',(req,res,next)=>{
	  let id = req.params.id;
		productController.getAddProduct({
			"_id": id
		})
		.then((doc)=>{
			console.log(doc)
			res.render('products/edit_product', {
				productData: doc
			});
		})
		.catch((err)=>{
			console.log(err);
			next();
		})
});

router.post('/doEditProduct/:id',(req,res,next)=>{
		let id 			= req.params.id;
		let dataSet = req.body;
			productController.updateProductData({
				"_id": id
			}, dataSet)
			.then((doc)=>{
				res.redirect('/products');
			})
			.catch((err)=>{
				console.log(err);
				next();
			})
});
router.get('/delete-product/:id',(req,res,next)=>{
	let id = req.params.id;
	productController.deleteProductData({
		"_id": id
	})
	.then((doc)=>{
		res.redirect('/products');
	})
	.catch((err)=>{
		console.log(err);
		next();
	})
})



module.exports = router;