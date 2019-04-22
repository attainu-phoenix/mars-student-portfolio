'use strict';

var getData = function(request, response) {
    var DB = request.app.locals.DB;

    DB.collection("recruiterPostJobs").find({}).toArray(function(error, allposts) {
       
        var data = {
            student: allposts
        }
         console.log(allposts);
        
         return response.render("student-apply.hbs", data);
    });
    // response.render("student-apply.hbs");
}

exports.getData = getData;