'use strict';
var mongo = require("mongodb");

var getData = function(request, response) {
    var data = {};
    
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    } else {
        data.loggedInUser = request.session.user;
    }
    
    var DB = request.app.locals.DB;

    DB.collection("recruiterPostJobs").find({recruiterId:request.session.user._id}).toArray(function(error, allPosts) {
        if(error) {return response.send("error fetching data"); }

        data.allPosts = allPosts;

        var jobId = mongo.ObjectId(request.params.id);

        DB.collection("studentApply").find({recruiterId:request.session.user._id}).toArray(function(error, students) {
            if(error) {return response.send("error fetching data");}

            data.students = students;

            console.log(students);
            return response.render("recruiterDash.hbs", data);
        });
    });

 }

exports.getData = getData;