'use strict';

var multiparty = require("multiparty");
var path = require("path");
var mongo = require("mongodb");
var cloudinary = require("cloudinary").v2;

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

    var DB = request.app.locals.DB;
    //console.log(request.session.user);

    var data = {};
    var recruiterId;


    if (request.query.recruiterId) {
        // This is a public profile request.
        // Get the student id here and do the rendering.
        recruiterId = request.query.recruiterId;

    } else {
        // This is a logged in user's request.
        // Get his/her data and do the rendering.
        recruiterId = request.session.user._id;
    }

    DB.collection("recruiters").findOne({ _id: mongo.ObjectID(recruiterId) }, function (error, recruiter) {
        if (error) { return response.send("error fetching user data"); }
        data.recruiter = recruiter;
        return response.render("recruiterProfile.hbs", data);
    });
}

var getFormData = function (request, response) {
    response.render("recruiterProfileForm.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

   var form = new multiparty.Form();

   form.parse(request, function(error, fields, files){

        var imagePath = files.photo[0].path;
        var imageName = path.basename(imagePath);
        var createdBy = request.session.user._id;

        var data = {
            name: fields.name,
            mail: fields.mailId,
            designation: fields.designation,
            organization: fields.organization,
            phoneNumber: fields.phoneNumber,
            summary: fields.summary,
            inlineRadioOptions: fields.inlineRadioOptions,
            imagePath: imagePath,
            imageName: imageName,
            createdBy: createdBy
        };

        cloudinary.uploader.upload(imagePath, { resource_type: "auto" }, function (error, imageUploaded) {
            if (error) {
                console.log(error);
                return response.send("error uploading");
            }

            // Use cloudinary uploaded URL for profile picture.
            data.imagePath = imageUploaded.secure_url;

            // Update the student profile
            var recruiterId = request.session.user._id;
            DB.collection("recruiters").update({ _id: mongo.ObjectID(recruiterId) }, { $set: data }, function (error) {
                if (error) { return response.send("error updating profile."); }
                return response.redirect("/recruiterProfile");
            }); // update ends

        }); // image upload ends

    }); 
}

exports.getData = getData;
exports.getFormData = getFormData;
exports.postData = postData;