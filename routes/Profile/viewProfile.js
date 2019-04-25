'use strict';

var mongo = require("mongodb");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

    var data = {};

    var DB = request.app.locals.DB;

    var studentId = request.params.studentId;

    DB.collection("studentApply").find({_id: mongo.ObjectId(studentId)}, function(error, allPost) {
      
		if(error) {
			return response.send("error fetching job from the DB");
		}

        data.allPost = allPost;

        DB.collection("student").find({_id:mongo.ObjectId(studentId)}, function(error, students) {
            if(error) {
                return response.send("Error fetching Data");
            }

            data.students = students;
            console.log(data);
            return response.render("viewProfile.hbs", data);
        })
    });

}

exports.getData = getData;