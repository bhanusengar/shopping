'use strict'

const express           = require('express');
const couponController 	= require('../controller/couponController');
const { check, validationResult } = require('express-validator/check');
const router            = express.Router();


router.get('/',(req,res,next)=>{
	couponController.getData({
			"active": true
		}).then((doc) => {
		res.render('coupons',{couponsLists:doc});
	})
	.catch((err)=>{
		console.log(err);
		next();
	})
});
router.get('/add-coupon',(req,res,next)=>{
		res.render('coupons/add_coupon', {
			validationError: req.flash('validationError')
		});
})

router.post('/doAddCoupon', [
			check('offer_code')
				.not().isEmpty()
				.withMessage('"Offer Code" Fields Cannot be Blank'),
			check('discount')
				.not().isEmpty()
				.withMessage('"Discount Percent" Fields Cannot be Blank')
				.isNumeric()
				.withMessage('"Discount Percent" Only Number Required')
		],(req, res, next) => {

		const errors = validationResult(req);
		 if (!errors.isEmpty()) {
			 req.flash('validationError', errors.array());
			 res.redirect('/coupons/add-coupon');
		}
		couponController.saveData(req.body)
		.then((doc)=>{
				res.redirect('/coupons');
		})
		.catch((err)=>{
			console.log(err);
			next();
		})
});
router.get('/edit-coupon/:id',(req,res,next)=>{
	  let id = req.params.id;
		couponController.getData({
			"_id": id
		})
		.then((doc)=>{
			res.render('coupons/edit_coupon', {
				couponData: doc
			});
		})
		.catch((err)=>{
			console.log(err);
			next();
		})
});

router.post('/doEditCoupon/:id',(req,res,next)=>{
		let id 			= req.params.id;
		let dataSet = req.body;
			couponController.updateData({
				"_id": id
			}, dataSet)
			.then((doc)=>{
				res.redirect('/coupons');
			})
			.catch((err)=>{
				console.log(err);
				next();
			})
});
router.get('/delete-coupon/:id',(req,res,next)=>{
	let id = req.params.id;
	couponController.deleteData({
		"_id": id
	})
	.then((doc)=>{
		res.redirect('/coupons');
	})
	.catch((err)=>{
		console.log(err);
		next();
	})
})

module.exports = router;