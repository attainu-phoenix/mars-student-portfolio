'use strict';

var getData = function(request, response) {
    response.render("student-profile-form.hbs");
}

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
}

exports.getData = getData;
exports.postData = postData;