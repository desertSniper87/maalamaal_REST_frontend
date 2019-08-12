$loginform = $('#loginForm');

$loginform.on("submit", function(event){
    event.preventDefault();

    $.ajax({
        url: config.backend_url + "/login/",
        method: "POST",
        dataType: "json",
        data: JSON.parse(JSON.stringify($loginform.serialize())),
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            Cookies.set('username', data.username);
            Cookies.set('token', data.token);
            Cookies.set('account_type', data.account_type);
            window.location.href = "/profile.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        }
    });
});


