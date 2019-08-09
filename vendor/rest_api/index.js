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
