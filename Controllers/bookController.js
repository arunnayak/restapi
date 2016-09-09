var bookController = function (Book) {

    var post = function (req, res) {
        var book = new Book(req.body);
        //console.log(book);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required!');
        }
        else{
            book.save();
            res.status(201);
            res.send(book);
        }
    }

    var get = function (req, res) {
        //var responseJson = {hello: "this is my api"};
        //res.json(responseJson);

        //filter the data with query string > all of them
        //var query = req.query;
        //filter the data with query string > all of them

        //filter data with only genre
        var query = {};
        if (req.query.genre){
            query.genre = req.query.genre;
        }
        //filter data with only genre

        Book.find(query, function (err, books) {
            if(err)
            //console.log(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = bookController;
