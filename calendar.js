var dateConfig = {
 monday: startOfWeek(new Date()),
 appointments: [
  {
   date: "2020-01-27",
   hour: "14:00"
  }
 ]
}

function checkAppointments(){
  // Check one by one the elements in the appointments list
  // see if they correspond to the current week we are displaying
  // if one of the elements contains the booking
  // we go to the corresponding cell and change the style
  let mondayDate = dateConfig.monday.getDate();
  let sunday = new Date(mondayDate + 6);
  dateConfig.appointments.forEach((app) => {
    let appointmentDate = new Date(app.date);
    if (appointmentDate.getDate() >= mondayDate && appointmentDate <= sunday.getDate()){

    }
  });
};

// Given the id of a cell and the current Monday (stored in Dateconfig)
// We retrieve a json object that has a corresponding date and hour.
function getAppointment(id){
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
 // example id = Monday-12:00
 let day = id.split('-')[0];

 let numericDay = days.indexOf(day);
 console.log(numericDay);

 let cellDate = new Date(dateConfig.monday.getDate() + numericDay);
 console.log(cellDate);
 return cellDate.toString();
};


function createCalendar(){
  var monday = dateConfig.monday;
  addWeekLabels(monday);
  createHeaderDays();
  createCells();
  addListenersToCells();
  addListenersToButtons();
};

function startOfWeek(date){
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};


function dateToString(date){
  var newDate = date;
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();

  var dateString = day + "/" + month + "/" + year;
  return dateString;
};

function createHours(){
    var hours = [];
    // creating the hours
    for(var i = 8; i < 23; i++){
      if(i < 10){
        hours.push("0" + i + ":00");
      }else{
        hours.push(i + ":00");
      }
    }
    return hours;
};

function createHeaderDays(){
  var days = ["M", "T", "W", "T", "F", "S", "S"]

  var head = document.getElementById("booking-calendar__head");
    // creating the header days
    var header = document.createElement('tr');
    header.innerHTML += "<th></th>"
    for(var k = 0; k < 7; k++){
      header.innerHTML += "<th>" + days[k] + "</th>";
    };
    head.innerHTML += header.innerHTML;
};

function createCells(){
   var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

   var tableBody = document.getElementById('booking-calendar__body');
    var hours = createHours();
    //creating the rows
    for(var i = 0; i < 15; i++){
      var row = document.createElement('tr');
      var rowText = "<td>" + hours[i] + "</td>";
      for(var j = 0; j < 7; j++){
        rowText += `<td class='available' data-selected='false' id="${days[j]}-${hours[i]}"></td>`;
      }
      row.innerHTML += rowText;
      tableBody.innerHTML += row.innerHTML;
    }
};

function addListenersToCells(){
  var listOfCells = document.querySelectorAll('.available');
  listOfCells.forEach((cell) => {
    cell.addEventListener('click', function(e){
      var currentCell = e.target;

      if(currentCell.dataset.selected =='false'){
        currentCell.className = 'selected';
        currentCell.dataset.selected = 'true';
      }else{
        currentCell.className = 'available';
        currentCell.dataset.selected = 'false';
      }
      console.log("This is the button " + currentCell.id);
    });
  });
};

function addWeekLabels(monday){
  var sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+6);
  // creating the week labels
  var startOfWeek = document.getElementById("start-of-week-label");
  var endOfWeek = document.getElementById("end-of-week-label");

  startOfWeek.innerHTML = dateToString(monday);
  endOfWeek.innerHTML = dateToString(sunday);
};


function addListenersToButtons(){
  var previous = document.getElementById('previous');
  var next = document.getElementById('next');
  
  previous.addEventListener('click', () => {
    previousWeek();
    addWeekLabels(dateConfig.monday);
  });

  next.addEventListener('click', () => {
    nextWeek();
    addWeekLabels(dateConfig.monday);
  });
};

function previousWeek(){
  var monday = dateConfig.monday;
  var previousMonday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()-7);
  dateConfig.monday = previousMonday;
};

function nextWeek(){
 var monday = dateConfig.monday;
 var nextMonday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+7);
 dateConfig.monday = nextMonday;
};

createCalendar(dateConfig.monday);