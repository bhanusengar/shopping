'use strict'

const routes = {
	MAIN:require('./main')
}

module.exports  = (app)=>{
		app.use('/',routes.MAIN)
}
