function createCalendar(){
  var body = document.getElementById('booking-calendar__body');
  var head = document.getElementById("booking-calendar__head");
  var currentWeekMonday = new Date();
  var currentWeekSunday = new Date();
  var hours = [];
  var days = ["M", "T", "W", "T", "F", "S", "S"]

  // creating the hours
  for(var i = 8; i < 23; i++){
    if(i < 10){
      hours.push("0" + i + ":00");
    }else{
      hours.push(i + ":00");
    }
  }

  // creating the week labels
  var weekLabels = document.getElementById("week-labels");
  currentWeekMonday = getMonday(currentWeekMonday);
  currentWeekSunday = new Date(currentWeekSunday.setDate(currentWeekMonday.getDate() + 6));
  
  weekLabels.innerHTML += dateToString(currentWeekMonday) + "   " + dateToString(currentWeekSunday);

  // creating the header days
  var header = document.createElement('tr');
  header.innerHTML += "<th></th>"
  for(var k = 0; k < 7; k++){
    header.innerHTML += "<th>" + days[k] + "</th>";
  };
  head.innerHTML += header.innerHTML;

  //creating the rows
  for(var i = 0; i < 15; i++){
    var row = document.createElement('tr');
    var rowText = "<td>" + hours[i] + "</td>";
    for(var j = 0; j < 7; j++){
      rowText += "<td>X</td>";
    }
    row.innerHTML += rowText;
    body.innerHTML += row.innerHTML;
  }
};

function getMonday(date){
  var newDate = date.setDate(date.getDate() - date.getDay() + 1);
  return new Date(newDate);
};

function dateToString(date){
  var newDate = new Date(date);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  var dateString = day + "/" + month + "/" + year;
  return dateString;
};

createCalendar();