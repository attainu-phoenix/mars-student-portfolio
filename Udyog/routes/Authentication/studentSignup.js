'use strict';

var getData = function(request, response) {
    response.render("student-signup.hbs");
}

exports.getData = getData;