'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        response.send("sorry only logged in users are allowed");
        return;
    }

    response.render("studentsDashboard.hbs");
};

exports.getData = getData;