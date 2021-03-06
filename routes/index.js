var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var db = require("../db/db.js")
function hashPassword(password, salt){
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.userLevel == 1)
        res.redirect("/admin");
    else if(req.session.userLevel == 2)
        res.redirect("/users");
    else
        res.render('login');
});
router.post("/", function(req, res){
    var salt, hash;
    var username = req.body.username;
    var password = req.body.password;
    db.get("select * from users where username = ? collate nocase", username, function(err, row){
        if(typeof row === 'undefined'){
            res.locals.error = "error";
            res.render("login");
        }
        else{
            salt = row.salt;
            hash = row.password;
            password = hashPassword(password, salt);
            if(hash == password){
                if(row.userLevel == 1){
                    req.session.userLevel = 1;
                    req.session.idUser = row.idUser;
                    res.redirect("/admin");
                }
                else if(row.userLevel == 2){
                    req.session.userLevel = 2;
                    req.session.idUser = row.idUser;
                    res.redirect("/users");
                }
            }
            else{
                res.locals.error = "error";
                res.render("login");
            }
        }
    });
});
router.get("/logout", function(req, res, next){
    req.session.destroy(function(err){
        res.redirect("/");
    });
});
module.exports = router;
