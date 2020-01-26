var currentWeekMonday = new Date();
var currentWeekSunday = new Date();

function createCalendar(){
  currentWeekMonday = getMonday(currentWeekMonday);
  currentWeekSunday = new Date(currentWeekSunday.setDate(currentWeekMonday.getDate() + 6));
  addWeekLabels();
  createHeaderDays();
  createCells();
  addListenersToCells();
  addListenersToButtons();
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
   var days = ["M", "T", "W", "T", "F", "S", "S"]

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

function addWeekLabels(){

  // creating the week labels
  var startOfWeek = document.getElementById("start-of-week-label");
  var endOfWeek = document.getElementById("end-of-week-label");

  startOfWeek.innerHTML += dateToString(currentWeekMonday)
  endOfWeek.innerHTML += dateToString(currentWeekSunday);
};

function nextWeek(){
 currentWeekMonday = currentWeekMonday.setDate(currentWeekMonday.getDate() + 7);
 currentWeekSunday = currentWeekSunday.setDate(currentWeekSunday.getDate() + 7);
 addWeekLabels();
};

function addListenersToButtons(){
 var previous = document.getElementById('previous');
 var next = document.getElementById('next');
 previous.addEventListener('click', () => {
   previousWeek();
 });

 next.addEventListener('click', () => {
   nextWeek();
 });

function previousWeek(){
 console.log(currentWeekMonday.getDate());
 currentWeekMonday = currentWeekMonday.setDate(currentWeekMonday.getDate() - 7);
 currentWeekSunday = currentWeekSunday.setDate(currentWeekSunday.getDate() - 7);
 addWeekLabels();
};
}


createCalendar();