// Date
var date = new Date();
var d = date.getDate();
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
var m = month[date.getMonth()];
var y = date.getFullYear();
var dateNow = (d <= 9 ? '0' + d : d) + ' ' + (m <= 9 ? ' ' + m : m) + ' ' + y;
document.getElementById("dateNow").innerHTML = dateNow;

// Set Date Today
document.getElementById('setDate').value = new Date().toISOString().substring(0, 10);


var formatDate = function (date) {
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " ";
}
