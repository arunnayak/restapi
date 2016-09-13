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
    return {
        post: post,
        //get: get
    }
}

module.exports = authorController;
