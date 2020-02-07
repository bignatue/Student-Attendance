$(document).ready(function () {

    getAccessToken();

    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    // Save the new user details
    $('#btnLogin').click(function () {
        $.ajax({
            url: '/token',
            method: 'POST',
            contentType: 'application/json',
            data: {
                username: $('#txtUsername').val(),
                password: $('#txtPassword').val(),
                //date: new Date(),
                grant_type: 'password'
            },
            success: function (response) {
                localStorage.setItem('accessToken', response.access_token);
                localStorage.setItem("userName", response.userName);
                window.location.href = 'home.html';
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});