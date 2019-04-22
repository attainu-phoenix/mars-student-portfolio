'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        response.redirect("/");
        return;
    }

    var DB = request.app.locals.DB;

    DB.collection("recruiterPostJobs").find({}).toArray(function(error, allposts) {

        var data = {
            student: allposts
        }
         console.log(allposts);
         return response.render("studentsDashboard.hbs", data);
    });

    // response.render("studentsDashboard.hbs");
};

// var postData = function(request, response) {

// }

exports.getData = getData;
// exports.postData = postData;