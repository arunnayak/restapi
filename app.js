var express = require ('express'),
    mongoose = require ('mongoose'),
    bodyParser = require('body-parser');

var db;

//connect to mongoDB
//process.env.ENV = 'Test';
//console.log(process.env.ENV);

if(process.env.ENV == 'Test')
    db = mongoose.connect ('mongodb://localhost/bookAPI_Test');
else{
    db = mongoose.connect ('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');
//var Author = require('./models/authorModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
//authorRouter = require('./Routes/authorRoutes')(Author);


app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);


//message on the page when server starts
app.get ('/', function (req, res){
    res.send('Welcome to my API.')
});

//listen my app on port
app.listen(port, function(){
   console.log('Running on PORT: ' + port);
});

module.exports = app;