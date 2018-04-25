var express = require('express');
var router = express.Router();
var db = require('../../db/db');

router.all("*", function(req, res, next){
    if(req.session.userLevel == 1)
        next();
    else
        res.redirect("/");
});

router.get('/', function (req, res, next) {
    db.all('SELECT first || " " || last as name, grade, grades.name as description, idGrade, courses.name as class FROM grades left join users on grades.idUser = users.idUser left join courses on grades.idCourse = courses.idCourse', function (err, rows) {
        if(err) throw err;
        res.locals.info = rows;
        res.render('./adminViews/gradesList');
    });
});
router.get('/addGrade', function(req, res, next){
    db.all("select * from users where userLevel = 2", function(err, rows){
        res.locals.users = rows;
        db.all("select * from courses", function(err, rows){
            res.locals.courses = rows;
            res.render("adminViews/addGrade");
        });
    });
});
router.post("/addGrade", function(req, res){
    var idUser = req.body.idUser;
    var idCourse = req.body.idCourse;
    var name = req.body.name;
    var grade = req.body.grade;
    db.run("insert into grades (idUser, idCourse, name, grade) values (?, ?, ?, ?)",
    [idUser, idCourse, name, grade], function(err){
        res.redirect("/gradeList");
    });
});
router.post("/delete", function(req, res){
    var idGrade = req.body.idGrade;
    db.run("delete from grades where idGrade = ?", idGrade, function(err){
        res.redirect("/gradeList");
    });
});

module.exports = router;
