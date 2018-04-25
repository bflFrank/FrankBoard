var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function (req, res, next) {
    db.all('SELECT * FROM courses', function (err, rows) {
        if (err) throw err;
        res.render('./studentViews/courseView', {
            title: 'My Courses',
            rows: rows
        });
    });
});

router.get('/courseView', function(req, res, next) {
    db.all("select subject, room, code, crn, first, last from courses left join registration on courses.idCourse = registration.idCourse left join users on registration.idUser = users.idUser where idUser = ?", req.session.idUser,
     function (err, rows) {

         res.local.courses = rows;
        if (err) {
            return console.log(err);
        }

        res.render('/courseView');
    });

});

module.exports = router;
