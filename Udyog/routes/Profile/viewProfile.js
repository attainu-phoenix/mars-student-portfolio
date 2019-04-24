'use strict'

var mongo = require("mongodb");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

    var DB = request.app.locals.DB;

    var studentId = request.params.studentId;

    DB.collection("student").findOne({_id: mongo.ObjectId(studentId)}, function(error, allPost) {
      
		if(error) {
			return response.send("error fetching job from the DB");
		}

        var data = {
            allPost: allPost
        };
   
         return response.render("viewProfile.hbs", data);
    });

}



exports.getData = getData;