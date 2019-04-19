'use strict';
var multiparty = require("multiparty")

var getData = function(request, response) {
    response.render("studentProfile.hbs");
}
var postData = function(request, response) {
    var DB = request.app.locals.DB;
    // var name = request.body.name;
    // var mail = request.body.mailId;
    // var skills = request.body.skills;
    // var education = request.body.education;
    // var profileSummary = request.body.summary;
    // var experience = request.body.experience;
    // var itSkills = request.body.itSkills;
    // var projects = request.body.projects;
    // var profile = request.body.photo;
    // var resume = request.body.resume

    // var newStudent = {
    //     name: name,
    //     mail: mail,
    //     skills: skills,
    //     education: education,
    //     profileSummary: profileSummary,
    //     experience : experience,
    //     itSkills : itSkills,
    //     projects : projects,
    //     resume : resume,
    //     profile : profile
    // }
    var profileImg = new multiparty.Form({
        autoFiles: true,
        uploadDir: "public/studentProfile/profileImg",
        uploadDir: "public/studentProfile/resume"
    });
    
    profileImg.parse(request, function(error, fields, files){
     var data = {
         name: fields.name,
         keySkills: fields.keySkills,
         education: fields.education,
         summary: fields.summary,
         experience: fields.experience,
         itSkills: fields.itSkills,
         projects: fields.projects,
         profileImg: files.photo,
         resume: files.resume
     };
 
        console.log(data);
 
        DB.collection("student").insertOne(data,function(error, result){
         if(error){
             console.log("error occured while inserting data to DB")
             return;
         }
         response.redirect("/studentProfile");
     })
    })


}

exports.getData = getData;
exports.postData = postData;