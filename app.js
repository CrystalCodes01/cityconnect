const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');
const app = express();

require('dotenv').config();
require('./config/passport-config.js');
// NAME OF DATABASE cityconnect //

require('mongoose-type-url');
mongoose.connect(process.env.MONGODB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'City Connect';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(layouts);

/////// BEGIN MIDDLEWARE ////////////

app.use(session({
  // the value of "secret" doesn't matter, except it has to be different for every app.js file
  secret: 'shdjdhajkshdkjahejwqweqqw',
  resave: true,
  saveUninitialized: true
})); // 2 parenthesis: 1 for 'app.use(' and another for "session("

// PASSPORT middlewares
  // these need to come after "app.use(session(...));"
app.use(passport.initialize());
app.use(passport.session());

// THIS MIDDLEWARE CREATES THE CURRENT USER FOR ALL VIEWS IF USER IS LOGGED IN //
// if the user is not logged in "req.user" will be empty

// Check if the user is logged in
app.use((req, res, next) => {
  if (req.user) {
  // create the currentUser local variable
    res.locals.currentUser = req.user;
  }
  next(); // --> call next or app will hang
});

// THIS MUST BE BEFORE PASSPORT AND ABOUT ROUTES
////////// END ///////////


//////// <- ROUTES START -> //////////
const index = require('./routes/index');
app.use('/', index);

const myAuthRoutes = require('./routes/auth-route.js'); // sign up login, logout ect
app.use('/', myAuthRoutes);

const about = require('./routes/about-route');
app.use('/', about);

const contact = require('./routes/contact-route');
app.use('/', contact);

const newEvent = require('./routes/new-event-route');
app.use('/', newEvent);

// const explore = require('./routes/explore-route');
// app.use('/', explore);

const search = require('./routes/search-route');
app.use('/', search);

//////// <- ROUTES END -> //////////

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
