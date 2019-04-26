'use strict';
var multiparty = require("multiparty");
var fs = require("fs");
var path = require("path");
var mongo = require("mongodb");
var cloudinary = require("cloudinary").v2;


var getData = function (request, response) {
    if(!request.session.user) {
        return response.redirect("/");
    }

    var DB = request.app.locals.DB;
    //console.log(request.session.user);

    var data = {};
    var studentId;


    if(request.query.studentId) {
        // This is a public profile request.
        // Get the student id here and do the rendering.
        studentId = request.query.studentId;

    } else {
        // This is a logged in user's request.
        // Get his/her data and do the rendering.
        studentId = request.session.user._id;
    }

    DB.collection("students").findOne({_id: mongo.ObjectID(studentId)}, function(error, student) {
        if(error) { return response.send("error fetching user data"); }
        data.student = student;
        return response.render("studentProfile.hbs", data);
    });
}

var getFormData = function (request, response) {
    response.render("studentProfileForm.hbs");
}

var postData = function (request, response) {
    var DB = request.app.locals.DB;

    var form = new multiparty.Form();

    form.parse(request, function (error, fields, files) {
        var name = fields.name;
        var keySkills = fields.keySkills;
        var education = fields.education;
        var summary = fields.summary;
        var experience = fields.experience;
        var itSkills = fields.itSkills;
        var projects = fields.projects;

		// Get the correct file names and paths
		var imagePath = files.photo[0].path;
		var resumePath = files.resume[0].path;
		var imageName = path.basename( imagePath );
		var resumeName = path.basename( resumePath );

		var createdBy = request.session.user._id;

        var data = {
            name: name,
            keySkills: keySkills,
            education: education,
            summary: summary,
            experience: experience,
            itSkills: itSkills,
            projects: projects,
            imagePath: imagePath,
            imageName: imageName,
            resumePath: resumePath,
            resumeName: resumeName,
            createdBy: createdBy
        };


        cloudinary.uploader.upload(imagePath, {resource_type: "auto"}, function(error, imageUploaded){
            if(error){
                console.log(error);
                return response.send("error uploading");
            }

            // Use cloudinary uploaded URL for profile picture.
            data.imagePath = imageUploaded.secure_url;
            
            cloudinary.uploader.upload(resumePath, {resource_type: "auto"}, function(error, resumeUploaded){
                if(error){
                    console.log(error);
                    return response.send("error uploading");
                }

                // Use cloudinary uploaded URL for the resume.
                data.resumePath = resumeUploaded.secure_url;

                // Update the student profile
                var studentId = request.session.user._id;
                DB.collection("students").update({_id: mongo.ObjectID(studentId)}, {$set: data}, function(error) {
                    if(error) { return response.send("error updating profile."); }
                    return response.redirect("/studentProfile");
                }); // update ends

            }); // resume upload ends
    
        }); // profile picture upload ends

    }); // form parse end
       
} // route ends

exports.getData = getData;
exports.getFormData = getFormData;
exports.postData = postData;
