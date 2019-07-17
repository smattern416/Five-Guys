$(function () {
    $.get('api/jobs/search' + location.search).then(function (data) {
        console.log(data);

        let limit = 10;

        if (data.length < 10) {
            limit = data.length;
        }
        const resultsDiv = $("#results");

        resultsDiv.empty();

        for (let i = 0; i < limit; i++) {
            let jobTitle = $("<h1>").text(data[i].title);
            let companyName = $("<h2>").text(data[i].company);
            let location = $("<p>").text(data[i].location);
            let jobDetails = $(data[i].description);
            let divider = $("<hr>");
            let jobDiv = $("<div>");
            jobDiv
                .append(jobTitle)
                .append(companyName)
                .append(location)
                .append(divider)
                .on("click", function () {
                    $("#jobDetail").empty();
                    $("#jobDetail")
                        .append(jobTitle)
                        .append(companyName)
                        .append(location)
                        .append(jobDetails)
                });
            resultsDiv.append(jobDiv);
        }
    });
});