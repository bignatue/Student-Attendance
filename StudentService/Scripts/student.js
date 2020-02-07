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

// Close success message
$('#successClose').click(function () {
    $('#divSuccess').hide('fade');
    $('#statusAtt').prop('selectedIndex', 0);
});

$('#errorModal').on('hidden.bs.modal', function () {
    window.location.href = "Login.html";
});

// Display to table from db
$(document).ready(function () {

    // Display to table from db
    $.ajax({
        url: '/api/Students',
        method: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        success: function (data) {
            $('#capturestudents').empty();
            $.each(data, function (index, val) {
                var fullName = val.FirstName + ' ' + val.LastName;
                var action = '<a href="" id="action"><i class="fas fa-times ml-2 mr-1 text-danger"></i></a>';
                var row = $('<tr><td id="studentid">' + val.Id + '</td><td id="fullName">' + fullName + '</td><td id="gender">' + val.Gender + '</td><td id="course">' + val.Course + '</td><td>' + action + '</td></tr>');
                $('#capturestudents').append(row);
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

    // post from table to db
    $('#filterCourse').change(function () {
        var cor = $('#filterCourse').val();

        $.ajax({
            url: '/api/FilterStudents',
            method: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer '
                    + localStorage.getItem("accessToken")
            },
            data: { course: cor },
            success: function (data) {
                $('#capturestudents').empty();
                $.each(data, function (index, val) {
                    var fullName = val.FirstName + ' ' + val.LastName;
                    var action = '<a href="" id="action"><i class="fas fa-times ml-2 mr-1 text-danger"></i></a>';
                    var row = $('<tr><td id="studentid">' + val.Id + '</td><td id="fullName">' + fullName + '</td><td id="gender">' + val.Gender + '</td><td id="course">' + val.Course + '</td><td>' + action + '</td></tr>');
                    $('#capturestudents').append(row);
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

    // capture student data and save to student table
    $('#addStudents').click(function () {
        var obj = {
            "FirstName": $('#firstname').val(),
            "LastName": $('#lastname').val(),
            "Gender": $('#stdntgender').val(),
            "Course": $('#stdntcourse').val()
        };

        $.ajax({
            url: '/api/Students',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': 'Bearer '
                    + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(obj),
            success: function (data, val) {
                //$('#successModal').modal('show');
                $('#studentSuccessfullyAdded').show('fade');
                $('#successmessage').text(obj.FirstName + obj.LastName + ' has been added successfully!')
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});

// delete id table
$(document).on('click', '#action', function () {

    var obj = $(this).closest('tr').find('#studentid').text();
    var name = $(this).closest('tr').find('#fullName').text();

    $.ajax({
        url: '/api/Students/' + obj,
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        data: JSON.stringify({ 'Id': obj }),
        success: function (data, val) {
            $('#divSuccessMessage').text('Student has been deleted!');
            $('#divSuccess').show('fade');
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
