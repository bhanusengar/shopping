'use strict'

const mongoose  	= require('mongoose');
const timestamps 	= require('mongoose-timestamp');

const couponSchema = new mongoose.Schema({
  offer_code: {
    type: String,
    trim: true,
    required: true,
  },
  discount: {
     type: Number,
	 trim: true,
     required: true
  },
  active: {
		type: Boolean,
		default: true,
	}
});

couponSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
module.exports = mongoose.model('Coupon',couponSchema);
