'use strict';

var getData = function(request, response) {
    response.render("studentsDashboard.hbs");
}

exports.getData = getData;