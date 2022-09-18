const currentTime = document.querySelector('.currentTime');
const selectAlarm = document.querySelector('.selectAlarm');
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".alarm-btn");
const alarmList = document.getElementById(".alarmList");

let alarmTime;
let ringBell = new Audio("./RingBell/ringBell.mp3");

//  Array for List Store Alarms
var alarmListArray = [];
let alarmCount = 0;



// *******************************  Create options for Select     *******************************//

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}


//  *************************         Create Clock Time        ***************************//
function timeInterval() {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s}:${ampm}`;
}
setInterval(timeInterval);

function checkAlarm() {
    for (var i = 0; i < alarmListArray.length; i++) {
        if (alarmListArray[i] == currentTime.innerText) {
            ringBell.play();
            ringBell.loop = true;
            console.log("alarm Ringing");
            document.querySelector("#stopAlarm").style.visibility = "visible";
            document.querySelector("img, svg").style.visibility = "visible";
            alert(` Alarm ringing for ${currentTime.innerHTML}`);
        }
    }
}
setInterval(checkAlarm);

//*****************************   Set Alarm by Click on Set The Alarm Button    ************************//
function setAlarm() {
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}:${selectMenu[3].value}`;
    // alarmTime = alarmListArray;

    if (time.includes("Hour") || time.includes("Minute") || time.includes("Seconds") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    else {
        alarmCount++;
        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}:${selectMenu[3].value}`;
        if(!alarmListArray.includes(alarmTime)){
            alarmListArray.push(alarmTime);
            document.querySelector(".alarmList").innerHTML += `
            <div class="rounded">
            <div class="mb-2 text-white text-center justify-content-around d-flex" id="alarm${alarmCount}">
            <h5 class="mt-2  text-red" id="span${alarmCount}">${time}</h5>
            <button class=" btn btn-outline-danger delete-alarm-btn"  id="${alarmCount}" onclick="deleteAlarm(this.id)">Delete</button>
            </div>
            </div>`;
        }
        else{
            alert(`This alarm is already set on time ${alarmTime}`);
        }
    }
    console.log(time);
}
setAlarmBtn.addEventListener("click", setAlarm);

//***************************             Delete Alarm From List     ***********************//
function deleteAlarm(alarmId) {
    var element = document.getElementById("alarm" + alarmId);
    // console.log(element);
    var deleteIndex = alarmListArray.indexOf(document.querySelector("#span" + alarmId).innerText);
    alarmListArray.splice(deleteIndex, 1);
    element.remove();
}

//***********************************       Stop Alarm    **************************************//
function stopAlarm() {
    ringBell.pause();
    document.querySelector('#stopAlarm').style.visibility = "hidden";
    document.querySelector("img, svg").style.visibility = "hidden";
    console.log("stop the alarm");
}

