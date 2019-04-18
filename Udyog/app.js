<<<<<<< HEAD
"use strict";
=======
'use strict'
>>>>>>> ee5a529a9c9f5505a4f4031ad6eca500e6fe70ff

//External packages
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
<<<<<<< HEAD
var session = require("express-session");
=======
var multiparty = require("multiparty");
>>>>>>> ee5a529a9c9f5505a4f4031ad6eca500e6fe70ff

//Self modules
var indexPage = require("./routes/Authentication/indexPage.js");
var recruiterLogin = require("./routes/Authentication/recruiterLogin.js");
var recruiterSignup = require("./routes/Authentication/recruiterSignup.js");
var studentSignup = require("./routes/Authentication/studentSignup.js");
var recruiterDashboard = require("./routes/Dashboard/recruiterDashboard.js");
var studentDashboard = require("./routes/Dashboard/studentDashboard.js");
var recruiterProfile = require("./routes/Profile/recruiterProfile.js");
var studentProfile = require("./routes/Profile/studentProfile.js");
var recruiterPostJob = require("./routes/Jobs/recruiterPostJob.js");
var studentApplyJob = require("./routes/Jobs/studentApplyJob.js");

//create app
var app = express();

//app settings
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: "marskey" }));

//serve static files
app.use(express.static('public'));

//connect to mongodb
var DB;

<<<<<<< HEAD
var mongoClient = new mongodb.MongoClient('mongodb://127.0.0.1:27017/udyog', {useNewUrlParser: true});
mongoClient.connect(function(err) {
    if(err) {
        console.log("Error connecting to MongoDB");
    } else {
        console.log("Connection to MongoDB database udyog established");
    }
    DB = mongoClient.db("udyog");

    //save the DB variable for all routes
    app.locals.DB = DB;
=======
var mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/udyog', {useNewUrlParser: true});
mongoClient.connect(function(err) {
     if(err) {
        console.log("Error connecting to MongoDB");
     } else {
         console.log("Connection to MongoDB database udyog established");
    }
    DB = mongoClient.db("udyog");
     //save the DB variable for all routes
    
     app.locals.DB = DB;
>>>>>>> ee5a529a9c9f5505a4f4031ad6eca500e6fe70ff
});

//app routes
app.get("/", indexPage.getData);
app.post("/", indexPage.postData);

app.get("/recruiterLogin", recruiterLogin.getData);
app.post("/recruiterLogin", recruiterLogin.postData);

app.get("/recruiterLogout", recruiterLogin.logout);

app.get("/studentLogout", indexPage.logout);

app.get("/signUp_recruiter", recruiterSignup.getData);
app.post("/signUp_recruiter", recruiterSignup.postData)

app.get("/recruiterDash", recruiterDashboard.getData);

app.get("/recruiterProfile", recruiterProfile.getData);
app.post("/recruiterProfile", recruiterProfile.postData);

app.get("/recruiterPostJob", recruiterPostJob.getData);

app.get("/signupStudent", studentSignup.getData);
app.post("/signupStudent", studentSignup.postData);

app.get("/studentDash", studentDashboard.getData);

app.get("/studentProfile", studentProfile.getData);
app.post("/studentProfile", studentProfile.postData);

app.post("/studentProfile", studentProfile.postData);

app.get("/studentApply", studentApplyJob.getData);
console.log("app running")

app.listen(8080);