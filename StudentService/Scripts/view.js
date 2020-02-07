// Display username if login
$('#spanUsername').text('hello ' + localStorage.getItem('userName'));

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
 

$('#errorModal').on('hidden.bs.modal', function () {
    window.location.href = "Login.html";
});

$(document).ready(function () {

    //display mark stdntmark data to view.html
    $.ajax({
        url: '/api/StdntMark/',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        success: function (data) {
            $('#displaystudents').empty();
            $.each(data, function (index, val) {
                var marked = val.Status;
                if (marked == 'present') {
                    var marked = '<i class="fas fa-check ml-2 mr-1 text-success"></i>';
                } else
                    if (marked == 'late') {
                        var marked = '<i class="fas fa-clock ml-2 mr-1 text-warning"></i>';
                    }
                if (marked == 'absent') {
                    var marked = '<i class="fas fa-times ml-2 mr-1 text-danger"></i>';
                } else
                    if (marked == 'holiday') {
                        var marked = '<i class="fab fa-canadian-maple-leaf ml-2 mr-1 text-danger"></i>';
                    }
                var row = $('<tr><td>' + val.StdntId + '</td><td>' + val.StdntName + '</td><td>' + val.Course + '</td><td>' + val.Date + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td></tr>');
                $('#displaystudents').append(row);                
            });
        },
        error: function (jQXHR) {
            if (jQXHR.status == "401") {
                $('#errorModal').modal('show');
            }
            else {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        }
    });

    // filter by course
    $('#filterStudent').change(function () {
        var cor = $('#filterStudent').val();

        $.ajax({
            url: '/api/StdntMark',
            method: 'COURSE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer '
                    + localStorage.getItem("accessToken")
            },
            data: { course: cor },
            success: function (data) {
                $('#displaystudents').empty();
                $.each(data, function (index, val) {
                    var marked = val.Status;
                    if (marked == 'present') {
                        var marked = '<i class="fas fa-check ml-2 mr-1 text-success"></i>';
                    } else
                        if (marked == 'late') {
                            var marked = '<i class="fas fa-clock ml-2 mr-1 text-warning"></i>';
                        }
                    if (marked == 'absent') {
                        var marked = '<i class="fas fa-times ml-2 mr-1 text-danger"></i>';
                    } else
                        if (marked == 'holiday') {
                            var marked = '<i class="fab fa-canadian-maple-leaf ml-2 mr-1 text-danger"></i>';
                        }
                    var row = $('<tr><td>' + val.StdntId + '</td><td>' + val.StdntName + '</td><td>' + val.Course + '</td><td>' + val.Date + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td><td>' + marked + '</td></tr>');
                    $('#displaystudents').append(row);
                });
            },
            error: function (jQXHR) {
                if (jQXHR.status == "401") {
                    $('#errorModal').modal('show');
                }
                else {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                }
            }
        });
    });
});


