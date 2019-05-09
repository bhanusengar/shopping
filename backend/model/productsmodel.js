'use strict'

const mongoose  = require('mongoose');
const mongoosetimestamp = require('mongoose-timestamp');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

let productSchema = new mongoose.Schema({
    productName: String,
    gender: String,
    productPrice: {
        type: Number
    },
    discountPrice: {
        type: SchemaTypes.Double
    },
    productDiscount: {
        type: Number
    },
    productImage: {
        fileName: String,
        file: String
    }
})

productSchema.plugin(mongoosetimestamp);
module.exports = mongoose.model('Product', productSchema);