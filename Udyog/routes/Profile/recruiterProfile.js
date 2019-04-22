'use strict';

var multiparty = require("multiparty");

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

   return response.render("recruiterProfile.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

   var profileImg = new multiparty.Form({
       autoFiles: true,
       uploadDir: "public/recruiterProfile"
   });

   profileImg.parse(request, function(error, fields, files){
        var data = {
            name: fields.name,
            mail: fields.mailId,
            designation: fields.designation,
            organization: fields.organization,
            phoneNumber: fields.phoneNumber,
            summary: fields.summary,
            inlineRadioOptions: fields.inlineRadioOptions,
            profileImg: files.photo
        };

        DB.collection("recruiter").insertOne(data,function(error, result){
            if(error){
                return response.send("Error Inserting Data to DB");
            }
            return response.redirect("/recruiterDash");
        })
   })
}

exports.getData = getData;
exports.postData = postData;