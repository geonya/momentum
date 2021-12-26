const datePrint = document.querySelector("#datePrint span:first-child");
const timePrint = document.querySelector("#timePrint span:last-child");

function getClock() {
  const date = new Date();
  const weeks = ["SUN", "MON", "TUE", "WEB", "THU", "FRI", "SAT"];
  const years = date.getFullYear();
  const month = date.getMonth() + 1;
  const days = date.getDate();
  const week = weeks[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  datePrint.innerText = `${years}.${month}.${days}.${week}`;
  timePrint.innerText = `${hours}:${minutes}`;
}

getClock();
setInterval(getClock, 1000);
