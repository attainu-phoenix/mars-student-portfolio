'use strict';

var getData = function(request, response) {
    response.render("recruiterProfile.hbs");
}

var postData = function(request, response) {
    var name = request.body.name;
    var mail = request.body.mailId;
    
    console.log(name, mail);

    response.redirect("/recruiterProfile");
}

exports.getData = getData;
exports.postData = postData;