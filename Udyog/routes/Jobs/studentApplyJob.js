'use strict';

var mongo = require("mongodb");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/");
   }

    var DB = request.app.locals.DB;

	var jobId = request.params.jobId;

    DB.collection("recruiterPostJobs").findOne({_id: mongo.ObjectId(jobId)}, function(error, jobPost) {
      
		if(error) {
			return response.send("error fetching job from the DB");
		}

        var data = {
            jobPost: jobPost
        };
   
         return response.render("student-apply.hbs", data);
    });
}

// Create booking
var postData = function(request, response) {
    var data = {};

    if(!request.session.user) {
        return response.redirect("/");
    } else {
        data.loggedInUser = request.session.user;
    }

    var jobId = request.params.jobId;

    var DB = request.app.locals.DB;
    console.log(request.session.user);

    DB.collection("recruiterPostJobs").findOne({_id: mongo.ObjectID(jobId)}, function(error, jobPost) {
        if(error) { return response.send("error finding job post"); }

        DB.collection("studentApply").insertOne({
            jobId: jobId,
            userId: request.session.user._id,
            
            // Insert some extra data for showing to the user
            studentName: request.session.user.userName,
            jobTitle: jobPost.jobTitle,
    
            timeOfApply: new Date()
        }, function(error) {
    
            if(error) { return response.send("error occurred while applying"); }
    
            response.redirect("/studentDash");
    
        }); // bookings insert end

    }); // movies find one end

}// route end

exports.getData = getData;
exports.postData = postData;