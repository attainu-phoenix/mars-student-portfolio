"use express"

var express = require("express");
var mongo = require("mongodb");

//create app
var app = express();

//app settings
app.set("view engine", "hbs");

//serve static files
app.use(express.static('views'));

//app routes
app.get("/", function(request, response){
    response.render("index.hbs");
});

app.get("/signUp_recruiter", function(request, response){
    response.render("recruit-signup.hbs");
});

app.get("/recruiterDash", function(request, response){
    response.render("recruiterDash.hbs");
});

app.get("/recruiterProfile", function(request, response){
    response.render("recruiterProfile.hbs");
});

app.get("/recruiterPostJob", function(request, response){
    response.render("recruiterPostJob.hbs");
});


app.get("/signupStudent", function(request, response) {
    response.render("student-signup.hbs");
});

app.get("/studentDash", function(request, response){
    response.render("studentsDashboard.hbs");
});

app.get("/studentProfile", function(request, response){
    response.render("student-profile-form.hbs");
});

app.get("/studentApply", function(request, response){
    response.render("student-apply.hbs");
});
console.log("app running")

app.listen(8080);