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
                var status = `<div class="radio-group" id="statusAtt">
                                <input type="radio" class="radiobuttom" id="present" name="mark" value="present"> Present
                                <input type="radio" class="radiobuttom ml-2" id="late" name="mark" value="late"> Late
                                <input type="radio" class="radiobuttom ml-2" id="absent" name="mark" value="absent"> Absent
                                <input type="radio" class="radiobuttom ml-2" id="holiday" name="mark" value="holiday"> Holiday
                            </div>`;
                var row = $('<tr><td id="studentid">' + val.Id + '</td><td id="fullName">' + fullName + '</td><td id="course">' + val.Course + '</td><td>' + status + '</td></tr>');
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
                    var status = `<div class="radio-group" id="statusAtt">
                                <input type="radio" class="radiobuttom" id="present" name="mark" value="present"> Present
                                <input type="radio" class="radiobuttom ml-2" id="late" name="mark" value="late"> Late
                                <input type="radio" class="radiobuttom ml-2" id="absent" name="mark" value="absent"> Absent
                                <input type="radio" class="radiobuttom ml-2" id="holiday" name="mark" value="holiday"> Holiday
                            </div>`;
                    var row = $('<tr><td id="studentid">' + val.Id + '</td><td id="fullName">' + fullName + '</td><td id="course">' + val.Course + '</td><td>' + status + '</td></tr>');
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
});

// select mark and save to mark stdntmark table
$(document).on('click', 'input[name="mark"]:radio', function () {

    var obj = {
        "StdntId": $(this).closest('tr').find('#studentid').text(),
        "StdntName": $(this).closest('tr').find('#fullName').text(),
        "Course": $(this).closest('tr').find('#course').text(),
        "Date": new Date(),
        "Status": $(this).closest('tr').find('input[name="mark"]:radio:checked').val()
    }

    $.ajax({
        url: '/api/StdntMark',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },

        data: JSON.stringify(obj),
        success: function (data, val) {
            var name = obj.StdntName;
            var stat = obj.Status;
            $('#divSuccessMessage').text(name + ' is marked as ' + stat + '!');
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


