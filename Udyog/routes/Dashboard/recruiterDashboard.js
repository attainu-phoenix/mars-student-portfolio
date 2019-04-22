'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }
        
    var DB = request.app.locals.DB;

    if(DB.collection("student").find({name: "name"}) == request.session.user.mailId, function(error) {
        if(error) {
            response.send("Error fetching data");
        }
    }) {
        DB.collection("studentData").find({}).toArray(function(error, students) {
            var data = {
                students: students
            }
            
            return response.render("recruiterDash.hbs",data);
        });
    }
}

exports.getData = getData;