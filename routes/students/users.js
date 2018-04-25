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
router.get('/', function(req, res) {
    db.get("select first, last, studentID from users where idUser = ?", req.session.idUser, function(err, row){
        res.locals.name = row.first + " " + row.last;
        res.locals.id = row.studentID;
        res.render('./studentViews/studentView');
    });
});

module.exports = router;
