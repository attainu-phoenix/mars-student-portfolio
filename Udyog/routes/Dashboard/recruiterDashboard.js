'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        response.redirect("/recruiterLogin");
        return;
    }
    
    response.render("recruiterDash.hbs");
}

exports.getData = getData;