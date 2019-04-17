'use strict';

var getData = function(request, response){
    response.render("student-profile-form.hbs");
}

exports.getData = getData;