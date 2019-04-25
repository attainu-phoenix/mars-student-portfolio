'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/");
    }

    var DB = request.app.locals.DB;

    var querysearch = request.query.searchJobs;
    
    DB.collection("recruiterPostJobs").find({keySkills: {$regex: querysearch}}).toArray(function(error, jobs) { 
        var data = {
            jobs: jobs
        }

        return response.render("studentsDashboard.hbs", data);
    });
};

exports.getData = getData;