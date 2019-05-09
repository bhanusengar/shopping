require('dotenv').config();
const express 		= require('express');
const bodyParser 	= require('body-parser')
const mongoDB 		= require('./config/mongoose');
const path		 	= require('path');
const app 			= express();
var session 		= require('express-session');
var cookieParser = require('cookie-parser');
mongoDB.mmongoConn()
	.then(() => {
	console.log('Connected to mongo database....');
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json
	app.use(bodyParser.json());

	app.set('view engine','ejs');
	app.set('views',path.join(__dirname,'views'));
	app.use(express.static(path.join(__dirname,'public')));
	app.use('/imgpath', express.static(path.join(__dirname, '../backend/uploads')));
	app.set('trust proxy', 1) // trust first proxy
	app.use(session({
		secret: 'keyboard cats',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false
		}
	}))
	 app.use(cookieParser()); 
	

	require('./routes')(app);

	app.listen(process.env.PORT ||process.env.DEV_PORT,function(){
		console.log('--Server Running Port '+ process.env.DEV_PORT);
	});
})
.catch((err)=>{
	console.log(err);
})
