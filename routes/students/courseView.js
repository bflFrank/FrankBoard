var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function (req, res, next) {
    db.all('SELECT subject, grade, grades.name as description FROM courses left join grades on courses.idCourse = grades.idCourse where grades.idUser = ?', req.session.idUser, function (err, rows) {
        if (err) throw err;
        res.locals.rows = rows;
        db.get("SELECT sum(grade) as total, count(grade) as amount FROM courses left join grades on courses.idCourse = grades.idCourse where grades.idUser = ?", req.session.idUser, function(err, row){
            if(row.total / row.amount >= 90)
                res.locals.gpa = 4;
            else if(row.total / row.amount >= 80)
                res.locals.gpa = 3;
            else if(row.total / row.amount >= 70)
                res.locals.gpa = 2;
            else if(row.total / row.amount >= 60)
                res.locals.gpa = 1;
            else res.locals.gpa = 0;
            res.render('./studentViews/courseView');
        });
    });
});

module.exports = router;
