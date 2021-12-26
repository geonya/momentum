const loginForm = document.getElementById("status-bar__loginform");
const loginInput = document.querySelector("#status-bar__loginform input");
const greeting = document.querySelector("#status-bar__greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", handleSubmit);
} else {
  printGreeting(savedUsername);
}

function handleSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  printGreeting(username);
}

function printGreeting(username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Have a Good Day '${username}' 😃`;
}
