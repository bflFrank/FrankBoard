var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM users WHERE userLevel = 2', function(err, rows){
    if(err) throw err;

    res.render('./adminViews/studentListView', {
      title: 'Student List',
      rows: rows
    });
  });
});

router.post('/addStudent', function(req, res, send) {
    var formInfo = [req.body];
    var user = formInfo[0];
    db.run(`INSERT INTO users(studentID, username, first, last) VALUES(?, ?, ?, ?)`,
        [user.studentID, user.userName, user.firstName, user.lastName],
        function (err) {
            if (err) {
                return console.log(err);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

    res.redirect('/studentList/addStudent');
});

router.post('/removeStudent', function(req, res, send) {
    var buttonPush = req.body.idUser;
    db.run('DELETE FROM users WHERE idUser = ?', buttonPush,
        function(err){
            if(err){
                return console.log(err);
            }
            console.log(`A row has been deleted with rowid ${this.lastID}`);
        });

    res.redirect('/studentList')
});

router.get('/addStudent', function(req, res, send) {
    res.render('./adminViews/addStudent', {
        title: 'Add Student',
        message: 'Add Student'
    });
});

module.exports = router;
