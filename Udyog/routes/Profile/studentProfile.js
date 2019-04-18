'use strict';
var multiparty = require("multiparty")

<<<<<<< HEAD
var getData = function(request, response) {
    response.render("student-profile-form.hbs");
=======
var getData = function(request, response){
    response.render("studentProfile.hbs");
>>>>>>> ee5a529a9c9f5505a4f4031ad6eca500e6fe70ff
}
var postData = function(request, response) {
    var name = request.body.name;
    var mail = request.body.mailId;
    var skills = request.body.skills;
    var education = request.body.education;
    var profileSummary = request.body.summary;
    var experience = request.body.experience;
    var itSkills = request.body.itSkills;
    var projects = request.body.projects;
    var profileImg = request.body.photo;
    var resume = request.body.resume

<<<<<<< HEAD
var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var name = request.body.name;
    var keySkills = request.body.keySkills;
    var education = request.body.education;
    var summary = request.body.summary;
    var experience = request.body.experience;
    var itSkills = request.body.itSkills;
    var projects = request.body.projects;

    var newStudent = {
        name: name,
        keySkills: keySkills,
        education: education,
        summary: summary,
        experience: experience,
        itSkills: itSkills,
        projects: projects
    }

    DB.collection("student").insertOne(newStudent, function(error, data) {
        if(error) {
            console.log("Error occured while inserting data to DB");
        }

        response.redirect("/studentDash");
    })

    console.log(newStudent);
=======
    var newStudent = {
        name: name,
        mail: mail,
        skills: skills,
        education: education,
        profileSummary: profileSummary,
        experience : experience,
        itSkills : itSkills,
        projects : projects,
        resume : resume,
        profileImg : profileImg

    }
    var profileImg = new multiparty.Form({
        autoFiles: true,
        uploadDir: "public/studentProfile/profileImg"
    });
    profileImg.parse(request, function(error, data){
        if(error){
            console.log("error occured while inserting img to DB")
        }
    }) 

    var resume = new multiparty.Form({
       autoFiles: true,
       uploadDir: "public/studentProfile/resume"
    });
           profileImg.parse(request, function(error, data){
           if(error){
           console.log("error occured while inserting resume to DB")
    }
    })

    response.redirect("/studentProfile");

    var DB = request.app.locals.DB;

    DB.collection("student").insertOne(newStudent,function(error, result){
        if(error){
            console.log("error occured while inserting data to DB")
        }
        response.redirect("/studentProfile");
    })

    console.log(newStudent);

    //response.redirect("/studentProfile");


>>>>>>> ee5a529a9c9f5505a4f4031ad6eca500e6fe70ff
}

exports.getData = getData;
exports.postData = postData;