$(document).ready(function () {
    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    // Save the new user details
    $('#btnRegister').click(function () {
        $.ajax({
            url: '/api/account/register',
            method: 'POST',
            data: {
                email: $('#txtEmail').val(),
                password: $('#txtPassword').val(),
                confirmPassword: $('#txtConfirmPassword').val()
            },
            success: function () {
                $('#successModal').modal('show');
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});