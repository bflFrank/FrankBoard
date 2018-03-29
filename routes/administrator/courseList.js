var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function (req, res, next) {
    db.all('SELECT * FROM courses', function (err, rows) {
        if (err) throw err;

        res.render('./adminViews/courseListView', {
            title: 'Course List',
            rows: rows
        });
    });
});

router.post('/addCourse', function(req, res, send) {
    var formInfo = [req.body];
    var course = formInfo[0];
    db.run(`INSERT INTO courses(subject, code, name, days, room, crn) VALUES(?, ?, ?, ?, ?, ?)`, 
    [course.courseSubj, course.courseCode, course.courseName, course.courseDays, course.courseRoom, course.courseCRN], 
    function (err) {
        if (err) {
            return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    res.redirect('/courseList/addCourse');
});

router.post('/removeCourse', function(req, res, send) {
    var buttonPush = req.body.idCourse
    db.run('DELETE FROM courses WHERE idCourse = ?', buttonPush,
    function(err){
        if(err){
            return console.log(err);
        }
        console.log(`A row has been deleted with rowid ${this.lastID}`);
    });

    res.redirect('/courseList')
});

router.get('/addCourse', function(req, res, send) {
    res.render('./adminViews/addCourse', {
        title: 'Add Course',
        message: 'Add Course'
    });
});

module.exports = router;