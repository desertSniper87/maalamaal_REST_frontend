let $signupButton = $('#signupButton');
let $loginButton = $('#loginButton');
let $logoutButton = $('#logoutButton');

let token = Cookies.get('token');
let username = Cookies.get('username');

if (token != null ) {
    console.log('User logged in as ' + username);
    $signupButton.hide();
    $loginButton.hide();
    $logoutButton.removeClass('d-none');
} else {
    console.log('User not logged in');
}
