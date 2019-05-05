'use strict';

var mongo = require("mongodb");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/");
    }

    var DB = request.app.locals.DB;

    var querysearch = request.query.searchJobs;

    var data = {};
    var studentId;

    studentId = request.session.user._id;

    DB.collection("students").findOne({ _id: mongo.ObjectID(studentId) }, function (error, student) {
        if (error) { return response.send("error fetching user data"); }
        data.student = student;
        // return response.render("studentsDashboard.hbs", data);
    });
    
    DB.collection("recruiterPostJobs").find({keySkills: {$regex: querysearch}}).toArray(function(error, jobs) { 
        data.jobs = jobs;
        response.render("studentsDashboard.hbs", data);
    });
    
};

// var getImgData = function (request, response) {
//     if (!request.session.user) {
//         return response.redirect("/");
//     }

//     var DB = request.app.locals.DB;
//     //console.log(request.session.user);

    
// }

exports.getData = getData;
// exports.getImgData = getImgData;