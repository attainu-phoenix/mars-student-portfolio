'use strict';

var multiparty = require("multiparty");

var getData = function(request, response) {
    response.render("recruiterProfile.hbs");
}

var postData = function(request, response) {
    var name = request.body.name;
    var mail = request.body.mailId;
    var designation = request.body.designation;
    var organization = request.body.organization;
    var phone = request.body.phoneNumber;
    var profileSummary = request.body.summary;
    var recruiterType = request.body.recruiterType;
    var profileImg = request.body.photo 

    var newRecruiter = {
        name: name,
        mail: mail,
        designation: designation,
        organization: organization,
        phone: phone,
        profileSummary : profileSummary,
        recruiterType : recruiterType,
    }
      
    console.log(newRecruiter);

    var profileImg = new multiparty.Form({
        autoFiles: true,
        uploadDir: "public/recruiterProfile"
    });
    profileImg.parse(request, function(error, files){
        console.log(files);
        
        response.send("uploaded");
    }) 

     
    //var DB = request.app.locals.DB;

  
  
   // DB.collection("recruiter").insertOne(newRecruiter,function(error, result){
   //     if(error){
  //          console.log("error occured while inserting data to DB")
  //          return;
  //      }
  //      response.redirect("/recruiterProfile");
  //  })

  //  console.log(newRecruiter);

    //response.redirect("/recruiterProfile");
}

exports.getData = getData;
exports.postData = postData;