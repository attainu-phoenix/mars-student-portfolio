'use strict';

var getData = function(request, response) {
    response.render("index.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var userDetails = {
        userName: request.body.email,
        password: request.body.password
    };

    DB.collection("students").findOne(userDetails, function(error, user) {
        if(error) {
            resposnse.send("db error occurred");
            return;
        }

        if(!user) {
            response.redirect("/");
            return;
        }

        // Set the session for the user.
        request.session.user = user;

        response.redirect("/studentDash");
    });
}

var logout = function(request, response) {
    request.session.user = null;
    response.redirect("/");
}

exports.getData = getData;
exports.postData = postData;
exports.logout = logout;