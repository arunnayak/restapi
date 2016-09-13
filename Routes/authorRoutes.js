var express = require('express');

var routes = function (Author) {

    var authorRouter = express.Router();

    //define a author controller
    var authorController = require('../Controllers/authorController')(Author);

    //setup a router
    var authorRouter = express.Router();
    authorRouter.route('/')
        .post(authorController.post)
        //.get(bookController.get);

    //middleware function for get put and patch
    authorRouter.use('/:authorId', function (req, res, next) {
        Author.findById(req.params.authorId, function (err, author) {
            if(err)
                res.status(500).send(err);
            else if(author){
                req.author = author;
                next();
            }
            else{
                res.status(404).send('no author found');
            }
        });
    });
       
    return authorRouter;

};

module.exports = routes;