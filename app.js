var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var i18n = require('i18n');
var session = require('express-session');
var passport = require('passport');
//var cors = require('cors');
var index = require('./routes/index');
var shoping_cart = require('./routes/shopping_cart');
var admin = require('./routes/admin');
var app = express();
app.io = require('socket.io')();
var socketIO = require('./helpers/settup_socket_io')(app.io);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {

	//to allow cross domain requests to send cookie information.
	res.header('Access-Control-Allow-Credentials', true);

	// origin can not be '*' when crendentials are enabled. so need to set it to the request origin
	res.header('Access-Control-Allow-Origin',  req.headers.origin);

	// list of methods that are supported by the server
	res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

	next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'no'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//-----------------CUSTOM CONTROLLER------------------
app.use(i18n.init);
i18n.configure({
	locales:['en', 'vi'],
	directory: __dirname + '/views/locales',
	cookie: 'lang',
});
//--------------------------------------------------------
app.use('/',socketIO, index);
app.use('/shoping-cart',shoping_cart);
app.use('/admin', (req, res, next) => {
	if(req.user && req.user.role == 1){
		next();
	}else{
		res.redirect('/login/admin');
	}
});
app.use('/admin', admin);
//--------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
//--------------------------------------------------------
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
//-------------------------------------------------------
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});
//--------------------------------------------------------
mongoose.connect('mongodb://truongdang:789852@ds131989.mlab.com:31989/havana', {
	useMongoClient: true,
	promiseLibrary: require('bluebird')
});
//--------------------------------------------------------
const Category = require('./model/category');
Category.find({}, {_id : 1, name : 1, type : 1})
	.exec((err, category) => {
		app.locals.categories = category;
	});
//--------------------------------------------------------
module.exports = app;
