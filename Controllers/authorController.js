var authorController = function (Author) {

    var post = function (req, res) {
        var author = new Author(req.body);
        //console.log(author);

        if(!req.body.name){
            res.status(400);
            res.send('Name is required!');
        }
        else{
            author.save();
            res.status(201);
            res.send(author);
        }
    }
    var get = function (req, res) {
        //var responseJson = {hello: "this is my api"};
        //res.json(responseJson);

        //filter the data with query string > all of them
        //var query = req.query;
        //filter the data with query string > all of them

        //filter data with only country
        var query = {};
        if (req.query.country){
            query.country = req.query.country;
        }
        //filter data with only genre

        Author.find(query, function (err, authors) {
            if(err)
            //console.log(err)
                res.status(500).send(err);
            else
                //adding hyper media
                var returnAuthors = [];
                authors.forEach(function (element, index, array) {
                    var newAuthor = element.toJSON();
                    newAuthor.links = {};
                    newAuthor.links.self = 'http://' + req.headers.host + '/api/authors/' + newAuthor._id
                    returnAuthors.push(newAuthor);
                });

                res.json(returnAuthors);
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = authorController;
