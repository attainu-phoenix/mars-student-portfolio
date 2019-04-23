'use strict';

var getData = function(request, response) {
    if(!request.session.user) {
        return response.redirect("/recruiterLogin");
    }

   return response.render("recruiterPostJob.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var jobTitle = request.body.jobTitle;
    var jobDescription = request.body.jobDescription;
    var keySkills = request.body.keySkills.toLowerCase();
    var location = request.body.location;
    var desiredCandidates = request.body.desiredCandidates;
    var orgProfile = request.body.organizationProfile;

    var data = {
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        keySkills: keySkills,
        location: location,
        desiredCandidates: desiredCandidates,
        orgProfile: orgProfile
    }

    DB.collection("recruiterPostJobs").insertOne(data, function(error, result){
        if(error){
            return response.send("Error occured while inserting data to DB");
        }
        return response.redirect("/recruiterDash");
    })
}

exports.getData = getData;
exports.postData = postData;