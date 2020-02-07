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

$('#errorModal').on('hidden.bs.modal', function () {
    window.location.href = "Login.html";
});


$(document).on('change', '#statusAtt', function () {
    var obj = {
        "StdntId": $(this).closest('tr').find('#studentid').text(),
        "StdntName": $(this).closest('tr').find('#fullName').text(),
        "Course": $(this).closest('tr').find('#course').text(),
        "Date": new Date(),
        "Status": $(this).closest('tr').find('#statusAtt').val()
    }

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
            $('#divSuccessMessage').text('Attendance was succefully updated!');
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

$(document).ready(function () {
    //Close the bootstrap alert
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $.ajax({
        url: '/api/Students',
        method: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        success: function (data) {
            $('#students').empty();
            $.each(data, function (index, val) {
                var Sid = val.Id;
                var fullName = val.FirstName + ' ' + val.LastName; 
                var status = `<select class="form-control input-sm" id="statusAtt">
                                            <option selected>Choose...</option>
                                            <option value="present">Present</option>
                                            <option value="late">Late</option>
                                            <option value="absent">Absent</option>
                                            <option value="holiday">Public Holiday</option>
                                        </select >`;
                var row = $('<tr><td id="studentid">' + Sid + '</td><td id="fullName">' + fullName + '</td><td id="course">' + val.Course + '</td><td>' + status + '</td></tr>');
                $('#students').append(row);
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

    //// post marks students { this code save first row only }
    //$('#btnMark').click(function () {
    //    var date = new Date();
    //    var obj = {
    //        "StdntId": $('#studentid').text(),
    //        "StdntName": $('#fullName').text(),
    //        "Course": $('#course').text(),
    //        "Date": date,
    //        "Status": $('#statusAtt').val()
    //    };
    //    $.ajax({
    //        url: '/api/Test',
    //        type: 'POST',
    //        contentType: 'application/json; charset=utf-8',
    //        headers: {
    //            'Authorization': 'Bearer '
    //                + localStorage.getItem("accessToken")
    //        }, 
    //        data: JSON.stringify(obj),
    //        success: function (data) {
    //            $('#successModal').modal('show');
    //            window.location.reload();
    //        },
    //        error: function (jqXHR) {
    //            $('#divErrorText').text(jqXHR.responseText);
    //            $('#divError').show('fade');
    //        }
    //    });
    //}); 

});

