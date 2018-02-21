var crypto = require("crypto");
var fs = require("fs");
var db = require("./db/db");
function hashPassword(password, salt){
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}
function generateSalt(){
    var hash = crypto.createHash('sha256');
    var rnd = Math.random();
    hash.update(rnd.toString());
    return hash.digest('hex');
}
function generateDB(){
    //First time setup check
    if(fs.statSync("./db/data.db").size === 0){
        console.log("DB Not found!\nInitializing new DB...");
        fs.readFile("./db/create.sql", "UTF8", function(err, data){
            var statements = data.split(";");
            db.serialize(function(){
                for(var i = 0; i < statements.length - 1; i++){
                    db.run(statements[i]);
                }
            });
        });
        console.log("Complete!");
    }
}
module.exports = {
    hashPassword: hashPassword,
    generateSalt: generateSalt,
    generateDB: generateDB
};
