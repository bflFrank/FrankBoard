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

router.get('/addStudent', function(req, res, send){
  res.render('./adminViews/addStudent', {
    title: 'Add Student',
    message: 'Add Student'
  });
});

module.exports = router;
