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

$('#errorModal').on('hidden.bs.modal', function () {
    window.location.href = "Login.html";
});

var formatDate = function (date) {
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " ";
}

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
                    + val.Status + '</td><td>'
                    + formattedDate + '</td>');
                $('#res').append(row); 

                //var listArray = val.StdntId;
                //var uniquesArray = [];q
                //var count = 0;
                //var found = false;

                //for (var i = 0; i < uniquesArray.length; i++) {
                //    if (listArray[i] = uniquesArray[i]) {
                //        found = true;
                //    }
                //}
                //count++;
                //if (count == 1 && found == false) {
                //    uniquesArray.push(listArray[i]);
                //}
                //count = 0;
                //found = false;  
            });
        }
    });

    $.ajax({
        url: '/api/StdntMark',
        method: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer '
                + localStorage.getItem("accessToken")
        },
        success: function (data) {
            var uid = [];
            var count = 0;
            var found = false;
            $.each(data, function (index, val) {
                var sid = val.StdntId;
                for (var i = 0; i < uid.length; i++) {
                    if (sid == uid[i]) {
                        found = true;
                    }
                }
                count++;
                if (count == 1 && found == false) {
                    uid.push(sid);
                }
                count = 0;
                found = false;
            });

            for (var i = 0; i < uid.length; i++) {
                var row = $('<tr><td>' + uid[i] + '</td><td>' + sname +'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
                $('#result').append(row);

            }
        }
    });
});


//$(document).ready(function () {
//    $.ajax({
//        url: '/api/StdntMark',
//        method: 'GET',
//        contentType: 'application/json',
//        headers: {
//            'Authorization': 'Bearer '
//                + localStorage.getItem("accessToken")
//        },
//        success: function (data) {
//            var count = {};
//            $.each(data, function (index, val) {
//                var date = new Date(val.Date);
//                var formattedDate = formatDate(date);
//                var row = $('<tr><td>'
//                    + val.StdntId + '</td><td>'
//                    + val.StdntName + '</td><td>'
//                    + formattedDate + '</td>');
//                $('#res').append(row);
//            });
//        }
//    });
//});