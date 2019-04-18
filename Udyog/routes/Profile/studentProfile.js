'use strict';
var multiparty = require("multiparty")

var getData = function(request, response){
    response.render("studentProfile.hbs");
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
           profileImg.parse(request, function(error,fields, files){
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


}

exports.getData = getData;
exports.postData = postData;