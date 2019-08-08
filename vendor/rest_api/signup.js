$signupform = $('#signupForm');

$signupform.on("submit", function(event){
    event.preventDefault();

    $.ajax({
        url: config.backend_url + "/users/",
        method: "POST",
        dataType: "json",
        data: JSON.parse(JSON.stringify($signupform.serialize())),
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            console.log("Success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        }
    });
});


