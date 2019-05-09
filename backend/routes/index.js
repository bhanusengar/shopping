'use strict'
const auth = require('../middleware/auth');
const routes = {
    LOGIN:require('./login'),
    DASHBOARD:require('./dashboard'),
    PRODUCTS:require('./products'),
	COUPONS:require('./coupons'),
}

module.exports = (app)=>{
    app.use('/', routes.LOGIN)
    .use('/dashboard', auth.isAuthenticated, routes.DASHBOARD)
    .use('/products', auth.isAuthenticated, routes.PRODUCTS)
	.use('/coupons', auth.isAuthenticated, routes.COUPONS)
}

