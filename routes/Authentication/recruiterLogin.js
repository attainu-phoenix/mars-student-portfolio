'use strict';

var getData = function(request, response) {
    return response.render("recruiterLogin.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var userDetails = {
        userName: request.body.email,
        password: request.body.password
    };

    DB.collection("recruiters").findOne(userDetails, function(error, recruiter) {
        if(error) {
            return resposnse.send("db error occurred");
        }

        if(!recruiter) {
            return response.redirect("/recruiterLogin");
        }

        // Set the session for the user.
        request.session.user = recruiter;

        response.redirect("/recruiterDash");
    });
}

var logout = function(request, response) {
    request.session.user = null;
    response.redirect("/recruiterLogin");
}

exports.getData = getData;
exports.postData = postData;
exports.logout = logout;