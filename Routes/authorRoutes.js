var express = require('express');

var routes = function (Author) {

    var authorRouter = express.Router();

    //define a author controller
    var authorController = require('../Controllers/authorController')(Author);

    //setup a router
    var authorRouter = express.Router();
    authorRouter.route('/')
        .post(authorController.post)
        .get(authorController.get);

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

     //get Author by id
    authorRouter.route('/:authorId')
        .get(function (req, res) {
            var returnAuthor = req.author.toJSON();
            returnAuthor.links = {};
            returnAuthor.links.FilyerByThisGenre = 'http://' + req.headers.host + '/api/authors/?country=' + returnAuthor.country;
            res.json(returnAuthor);
        })
        .put(function (req, res) {
            req.author.name = req.body.title;
            req.author.age = req.body.author;
            req.authir.country = req.body.genre;
            req.author.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.json(req.author);
                }
            });
        })
        .patch(function (req, res) {
            //dont let Id update
            if (req.body._id)
                delete req.body._id;

            for(var p in req.body){
                req.author[p] = req.body[p];
            }
            req.author.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.json(req.author);
                }
            });
        })
        .delete(function(req, res){
            req.author.remove(function (err) {
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed.');
                }
            })
        });
         
    return authorRouter;

};

module.exports = routes;