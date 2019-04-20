'use strict';

var getData = function(request, response) {
   response.render("recruiterPostJob.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var jobTitle = request.body.jobTitle;
    var summary = request.body.summary;
    var keySkills = request.body.keySkills;
    var desiredCandidates = request.body.desiredCandidates;
    var orgProfile = request.body.organizationProfile;

    var data = {
        jobTitle: jobTitle,
        summary: summary,
        keySkills: keySkills,
        desiredCandidates: desiredCandidates,
        orgProfile: orgProfile,

    }

    console.log(data);

    DB.collection("recruiterPostJobs").insertOne(data, function(error, result){
        if(error){
            console.log("error occured while inserting data to DB")
            return;
        }
        response.redirect("/recruiterDash");
    })
      
  
   //console.log(postJob);

   //response.redirect("/recruiterProfile");
}

exports.getData = getData;
exports.postData = postData;