'use strict';

var getData = function(request, response) {
    response.render("student-apply.hbs");
}

exports.getData = getData;