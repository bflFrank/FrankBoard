var express = require('express');
var router = express.Router();
var db = require('../../db/db')

router.all("*", function(req, res, next){
    if(req.session.userLevel == 2)
        next();
    else
        res.redirect("/");
});

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('./studentViews/studentView', {
      title: 'Student',
      message: 'Student',
    });

});

module.exports = router;
