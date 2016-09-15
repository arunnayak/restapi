var express = require ('express'),
    mongoose = require ('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    exphbs = require('express-handlebars'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
    
//connect to mongoDB
//process.env.ENV = 'Test';
//console.log(process.env.ENV);

//if(process.env.ENV == 'Test')
  //  db = mongoose.connect ('mongodb://localhost/bookAPI_Test');
//else{
var db = mongoose.connect ('mongodb://localhost/bookAPI');
//}

var Book = require('./models/bookModel');
var Author = require('./models/authorModel');


var app = express();

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

authorRouter = require('./Routes/authorRoutes')(Author);
app.use('/api/authors', authorRouter);


app.use(express.static(path.join(__dirname, 'public')));
//message on the page when server starts
//app.get ('/', function (req, res){
    //res.send('Welcome to my API. <a href="/api/books">View JSON</a>')
    //res.sendFile(path.join(__dirname + '/index'));
//});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars');

app.use("/node_modules", express.static(__dirname + '/node_modules'));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());


//Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//global vars for messages
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();        
})

var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

//Set port
app.set('port', (process.env.PORT || 3000));

//listen my app on port
app.listen(app.get('port'), function(){
   console.log('Running on PORT: ' + app.get('port'));
});

module.exports = app;