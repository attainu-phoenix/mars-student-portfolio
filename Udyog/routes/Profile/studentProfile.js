'use strict';
var multiparty = require("multiparty");
var fs = require("fs");

var getData = function (request, response) {
    if(!request.session.user) {
        return response.redirect("/");
    }

    var DB = request.app.locals.DB;

    DB.collection("student").find({}).toArray(function(error, studentProfiles){
        if(error) {
            return response.send("Error fetching data");
        } else {
            var data = {
                studentProfiles: studentProfiles,
                loggedInUser: request.session.user
            };

            return response.render("studentProfile.hbs", data);
        }
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
        var file1Path = files.photo[0].path.split("\\");
        var imagePath = files.photo[0].path;
        var imageName = file1Path[file1Path.length - 1];
        var file2Path = files.resume[0].path.split("\\");
        var resumePath = files.resume[0].path;
        var resumeName = file2Path[file2Path.length - 1];
        var createdBy = request.session.user._id;

        var data = {
            name: name,
            keySkills: keySkills,
            education: education,
            summary: summary,
            experience: experience,
            itSkills: itSkills,
            projects: projects,
            file1Path: file1Path,
            imagePath: imagePath,
            imageName: imageName,
            file2Path: file2Path,
            resumePath: resumePath,
            resumeName: resumeName,
            createdBy: createdBy
        };

        // First, move the first file to uploads/first directory
        // fs.rename moves a file from one location to another.
        // It takes three parameters - file location, new location, callback
        // So in our case, we need to give the original filepath first and then the new one.

        // Move the first file from tmp folder to uploads/first
        fs.rename(imagePath, "public/studentProfile/profileImg/" + imageName, function (error) {
            if (error) {
                return response.send("error uploading file");
            }

            // Move the second file from tmp folder to uploads/second
            fs.rename(resumePath, "public/studentProfile/resume/" + resumeName, function (error) {
                if (error) {
                    return response.send("error uploading file");
                }

                DB.collection("studentData").insertOne(data, function (error, result) {
                    if (error) {
                        return response.send("Error Inserting Data to DB");
                    }
                   return response.redirect("/studentProfile");
                });
            });
        });
    });
}

exports.getData = getData;
exports.getFormData = getFormData;
exports.postData = postData;