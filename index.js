var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
     host : "127.0. 0.1",
     user : "root",
     password : "mahadev",
     database : "foodydata",
     options:{
      trustedconnection: true,
      enableArithAbort : true, 
      instancename :'MySQL80'
  },
  port: 3306
});
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/food_delivery_portal.html"));
  });

  app.post('/',function(req,res){

    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var message=req.body.message
    ;
  var moment = require('moment');
  var dateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    res.write('You sent the name "' + req.body.name+'".\n');
    res.write('You sent the email "' + req.body.email+'".\n');
    res.write('You sent the password "' + req.body.message+'".\n');
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO contacts (name, email,phone,message,created_at) VALUES ('"+name+"', '"+email+"','"+phone+"', '"+message+"','"+dateTime+"')";
        con.query(sql, function (err, result) {
          if(err){  //we make sure theres an error (error obj)
      
                if(err.errno==1062){
      
        var sql = 'UPDATE contacts SET name ="' + req.body.name+'",phone="'+ req.body.phone+'",message="' + req.body.message+'" WHERE email ="'+ req.body.email+'"';
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        });
                res.end();
      
            }
                else{
                    throw err;
                res.end();
              }
        }
          console.log("1 record inserted");
           res.end();
        });
        });
      });
      app.listen(3306);
console.log("Running at Port 3306");