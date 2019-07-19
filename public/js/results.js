function renderResult(data) {
    let limit = 10;
    if (data.length < 10) {
        limit = data.length;
    }

    //list div
    const resultsDiv = $("#results");

    //empty list
    resultsDiv.empty();

    //apend elements to list
    for (let i = 0; i < limit; i++) {
        let jobTitle = $("<h1>").text(data[i].title);
        let companyName = $("<h2>").text(data[i].company);
        let location = $("<p>").text(data[i].location);
        let divider = $("<hr>");
        let jobDiv = $("<div>").addClass("job");
        let jobId = data[i].id || data[i].jobId;
        let favButton = $("<button>").addClass("favHeart").html("<i class='far fa-heart'></i>").attr("value", jobId);
        jobDiv.on("click", function () {
            let jobDetails = $(data[i].description);
            let newTitle = $("<h1>").text(data[i].title);
            let newCompanyName = $("<h2>").text(data[i].company);
            let newLocation = $("<p>").text(data[i].location);
            $("#jobDetail").empty();
            $("#jobDetail").append(newTitle, newCompanyName, newLocation, favButton, jobDetails);
        });
        jobDiv.append(jobTitle, companyName, location, divider);
        resultsDiv.append(jobDiv);
    }
}
$.get('api/jobs/search' + location.search).then(function (data) {
    renderResult(data);
});
$(document).on("click", ".favHeart", function () {
    $.post("/api/fav/" + $(this).val()).then(function (data) {
        console.log(data);
    });

    $(this).toggleClass("pink");

});
$(document).on("click", ".results", function () {
    switch ($(this).attr("data-type")) {
        case "fav":
            $.get("/api/mostFav").then(function (data) {
                //empty detail
                $("#jobDetail").empty();
                renderResult(data);
            });

            break;
        case "search":
            $.get("/api/mostsearched").then(function (data) {
                //empty detail
                $("#jobDetail").empty();
                renderResult(data);
            })
            break;
        default:
            break;
    }
});