var express = require('express');
var router = express.Router();
router.all("*", function(req, res, next){
    if(req.session.userLevel == 1)
        next();
    else
        res.redirect("/");
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./adminViews/adminView', {
   title: 'Admin',
   message: 'Administrator'
 });
});

module.exports = router;
