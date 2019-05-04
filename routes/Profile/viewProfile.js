'use strict';

var mongo = require("mongodb");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

    var data = {};

    var DB = request.app.locals.DB;

    var studentId = request.params.studentId;

    if (request.query.studentId) {
        // This is a public profile request.
        // Get the student id here and do the rendering.
        studentId = request.query.studentId;

    } else {
        // This is a logged in user's request.
        // Get his/her data and do the rendering.
        studentId = request.session.user._id;
    }

        

        DB.collection("students").findOne({_id:mongo.ObjectId(studentId)}, function(error, student) {
            if(error) {
                return response.send("Error fetching Data");
            }

            data.students = student;
            console.log(data);
            return response.render("viewProfile.hbs", data);
        })


}

exports.getData = getData;