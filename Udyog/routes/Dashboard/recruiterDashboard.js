'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        response.send("sorry only logged in users are allowed");
        return;
    }
    
    response.render("recruiterDash.hbs");
}

exports.getData = getData;