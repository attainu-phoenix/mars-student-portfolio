'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/");
    }

    var DB = request.app.locals.DB;

    var querysearch = request.query.searchJobs;
    
    DB.collection("recruiterPostJobs").find({keySkills: {$regex: querysearch}}).toArray(function(error, jobs) {
        /* if(error) {
            return response.send("Error fetching data");
        } */
        
        var data = {
            jobs: jobs
        }

        return response.render("studentsDashboard.hbs", data);
    });
};

// var postData = function(request, response) {
//     var searchJobs = request.body.searchJobs;
// }

exports.getData = getData;
// exports.postData = postData;