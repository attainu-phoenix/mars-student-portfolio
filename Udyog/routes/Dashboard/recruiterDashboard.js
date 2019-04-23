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

    DB.collection("recruiterPostJobs").find({}).toArray(function(error, allPosts) {
        if(error) {return response.send("error fetching data"); }

        data.allPosts = allPosts;

        var jobId = mongo.ObjectId(request.params.id);

        DB.collection("studentApply").find({}).toArray(function(error, students) {
            if(error) {return response.send("error fetching data");}

            data.students = students;

            console.log(students);
            return response.render("recruiterDash.hbs", students);
        });
    });

 }

exports.getData = getData;