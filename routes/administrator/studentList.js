var express = require('express');
var router = express.Router();
var db = require('../../db/db')



/* GET home page. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM users WHERE userLevel = 2', function(err, rows){
    if(err) throw err;

    res.render('studentListView', {
      title: 'Student List',
      rows: rows
    });
  });
});

// router.get('/addStudent', function(req, res, next){
//   res.render()
// });

// router.post()

module.exports = router;
