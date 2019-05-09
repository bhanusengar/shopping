'use strict'
const express 			= require('express');
const router 			= express.Router();
const productController = require('../controller/productController');

router.get('/',(req,res,next)=>{

	productController.getAddProduct()
		.then((docs) => {
			console.log(docs)
			res.render('pages/home', {
				products:docs
			});
		})
		.catch((err) => {
			console.log(err.message);
		})
});
router.post('/cartIds',(req,res,next)=>{
	req.session.productsData = req.body.products;
});
router.get('/cart',(req,res,next)=>{
	console.log(req.session.productsData);
	console.log(req.session.test)
	res.render('pages/cart');
});

module.exports = router;
