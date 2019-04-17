'use strict';

var getData = function(request, response) {
    response.render("recruiterDash.hbs");
}

exports.getData = getData;