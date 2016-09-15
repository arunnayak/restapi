var express = require('express'),
    router = express.Router();

//register
router.get('/register', function(req, res) {
   res.render('register'); 
});

//logoin
router.get('/login', function(req, res) {
   res.render('login'); 
});

module.exports = router;