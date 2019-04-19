'use strict';

var getData = function(request, response) {
    response.render("recruit-signup.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var confirmPassword = request.body.confirmPassword;

    var user = {
        phone: request.body.phone,
        designation: request.body.designation,
        organization: request.body.organization,
        userName: request.body.userName,
        password: request.body.password,
        inlineRadioOptions: request.body.inlineRadioOptions
    };

    if(user.password == confirmPassword) {
        DB.collection("recruiters").insertOne(user, function(error) {
            if(error) {
                response.send("error occured while signup");
            } else {
                request.session.user = user;
                response.redirect("/recruiterDash");
            }
        });
        return;
    } else {
        response.redirect("/signUp_recruiter");
    }
}

exports.getData = getData;
exports.postData = postData;