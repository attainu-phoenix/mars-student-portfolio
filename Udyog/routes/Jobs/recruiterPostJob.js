'use strict';

var getData = function(request, response) {
    response.render("recruiterPostJob.hbs");
}

exports.getData = getData;