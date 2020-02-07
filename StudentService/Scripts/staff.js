// Display username if login
$('#spanUsername').text('Hello ' + localStorage.getItem('userName'));

// If user is not login redirect to login page
if (localStorage.getItem('accessToken') == null) {
    window.location.href = "Login.html";
}

// Sign Out function
$('#btnLogOff').click(function () {
    localStorage.removeItem('accessToken');
    window.location.href = "Login.html";
});

// Close error message
$('#linkClose').click(function () {
    $('#divError').hide('fade');
});

// Close success message
$('#successClose').click(function () {
    $('#divSuccess').hide('fade');
});

$('#errorModal').on('hidden.bs.modal', function () {
    window.location.href = "Login.html";
});


$(document).ready(function () {
    $.ajax({
        url: '/api/StdntMark',
        method: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        success: function (data) {
            $.each(data, function (index, val) {
                var date = new Date(val.Date);
                var formattedDate = formatDate(date);
                var row = $('<tr><td>'
                    + val.StdntId + '</td><td>'
                    + val.StdntName + '</td><td>'
                    + formattedDate + '</td>');
                $('#res').append(row);
            });
        }
    });
});