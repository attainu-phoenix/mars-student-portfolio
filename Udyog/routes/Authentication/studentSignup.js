'use strict';

var getData = function(request, response) {
    response.render("student-signup.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var confirmPassword = request.body.confirmPassword;

    var user = {
        userName: request.body.userName,
        password: request.body.password
    };

    if(user.password == confirmPassword) {
        DB.collection("student").insertOne(user, function(error) {
            if(error) {
                response.send("error occured while signup");
            } else {
                request.session.user = user;
                response.redirect("/studentDash");
            }
        });
        return;
    } else {
        response.redirect("/signupStudent");
    }
}

exports.getData = getData;
exports.postData = postData;