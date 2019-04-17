'use strict';

var indexPage = function(request, response) {
    response.render("index.hbs");
}

exports.indexPage = indexPage;