let $signupButton = $('#signupButton');
let $loginButton = $('#loginButton');
let $logoutButton = $('#logoutButton');
let $profileButton = $('#profileButton');

let token = Cookies.get('token');
let username = Cookies.get('username');

if (token != null ) {
    console.log('User logged in as ' + username);
    $signupButton.hide();
    $loginButton.hide();
    $logoutButton.removeClass('d-none');
} else {
    $profileButton.hide();
    console.log('User not logged in');
}

let productCardTemplateHtml= $('#productCardTemplate').html();
let $productList = $('#productList');

// Query for categories.
$(document).ready(function(){
    $.ajax({
        url: config.backend_url + "/products/",
        method: "GET",
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            html = Mustache.to_html(productCardTemplateHtml, {data: data.results});
            $productList.append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        }
    });
});

