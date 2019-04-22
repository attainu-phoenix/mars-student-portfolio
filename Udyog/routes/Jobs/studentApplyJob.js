'use strict';

var mongo = require("mongodb");

var getData = function(request, response) {
    var DB = request.app.locals.DB;
	var jobId = request.params.jobId;

    DB.collection("recruiterPostJobs").findOne({ _id: mongo.ObjectId(jobId)}, function(error, jobPost) {
      
		if(error) {
			return response.send("error fetching job from the DB");
		}

        var data = {
            jobPost: jobPost
        };

		console.log(jobPost)
        
         return response.render("student-apply.hbs", data);
    });
}

exports.getData = getData;
