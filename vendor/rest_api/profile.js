let $signupButton = $('#signupButton');
let $loginButton = $('#loginButton');
let $logoutButton = $('#logoutButton');

let $welcomeUsername = $('#welcomeUsername');
let $itemUploadForm = $('#itemUploadForm');

let $uploadBtn = $('#uploadBtn');
let categorySelectTemplateHtml= $('#categorySelectTemplate').html();
let $categorySelect = $('#categorySelect');

let token = Cookies.get('token');
let username = Cookies.get('username');

if (token != null ) {
    console.log('User logged in as ' + username);
    $signupButton.hide();
    $loginButton.hide();
    $logoutButton.removeClass('d-none');
    $welcomeUsername.text(username);
} else {
    console.log('User not logged in');
    window.location.href = "/signup.html"
}

$uploadBtn.click(function(envent){
    console.log("Click");
    $.ajax({
        url: config.backend_url + "/product_categories/",
        method: "GET",
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            console.log("Success");
            console.log(data);
            html = Mustache.to_html(categorySelectTemplateHtml, {data: data.results});
            $categorySelect.append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        }
    });

});

$itemUploadForm.submit(function(event){
    event.preventDefault();
    console.log("submit");

    $.ajax({
        url: config.backend_url + "/products/",
        method: "POST",
        dataType: "json",
        data: JSON.parse(JSON.stringify($itemUploadForm.serialize())),
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
