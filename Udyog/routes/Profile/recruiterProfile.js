'use strict';

var multiparty = require("multiparty");

var getData = function(request, response) {
   response.render("recruiterProfile.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

//    var name = request.body.name;
//    var mail = request.body.mailId;
//    var designation = request.body.designation;
//    var organization = request.body.organization;
//    var phone = request.body.phoneNumber;
//    var profileSummary = request.body.summary;
//    var recruiterType = request.body.recruiterType;
//    var profileImg = request.body.photo

<<<<<<< HEAD
    var profileImg = new multiparty.Form({
        autoFiles: true,
        uploadDir: "public/recruiterProfile"
    });
    profileImg.parse(request, function(error, fields, files){
        console.log(files);
        
        //response.send("uploaded");
    }) 
=======
//    var newRecruiter = {
//        name: name,
//        mail: mail,
//        designation: designation,
//        organization: organization,
//        phone: phone,
//        profileSummary: profileSummary,
//        recruiterType: recruiterType,
//        profileImg: profileImg,
//    }
>>>>>>> 2ee26593272f087ca7959dd4da6a16dc8beb1a1f

//    console.log(newRecruiter);

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

       console.log(data);

       DB.collection("recruiter").insertOne(data,function(error, result){
        if(error){
            console.log("error occured while inserting data to DB")
            return;
        }
        response.redirect("/recruiterDash");
    })
   })
   
 //  console.log(newRecruiter);

   //response.redirect("/recruiterProfile");
}

exports.getData = getData;
exports.postData = postData;