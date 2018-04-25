var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function (req, res, next) {
    db.all('SELECT subject, grade, grades.name as description FROM courses left join grades on courses.idCourse = grades.idCourse where grades.idUser = ?', req.session.idUser, function (err, rows) {
        if (err) throw err;
        res.locals.rows = rows;
        db.all("SELECT courses.idCourse, sum(grade) as total, count(grade) as amount FROM courses left join grades on courses.idCourse = grades.idCourse where grades.idUser = ? group by courses.idCourse", req.session.idUser, function(err, rows){
            var gpa = 0;
            var tot = 0;
            console.log(rows);
            for(var i = 0; i < rows.length; i++){
                if(rows[i].total / rows[i].amount >= 90)
                    gpa += 4;
                else if(rows[i].total / rows[i].amount >= 80)
                    gpa += 3;
                else if(rows[i].total / rows[i].amount >= 70)
                    gpa += 2;
                else if(rows[i].total / rows[i].amount >= 60)
                    gpa += 1;
                else res.locals.gpa = 0;
                tot++;
            }
            res.locals.gpa = gpa / tot;
            res.render('./studentViews/courseView');
        });
    });
});

module.exports = router;
