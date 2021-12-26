const toDoList = document.querySelector("#to-do-list");
const toDoForm = document.querySelector("#to-do-form");
const toDoInput = document.querySelector("#to-do-form input");

const TODOS_KYE = "todos-key";

let toDos = [];

const savedToDos = localStorage.getItem(TODOS_KYE);

function saveToDo() {
  localStorage.setItem(TODOS_KYE, JSON.stringify(toDos));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  saveToDo();
}

function paintToDo(obj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  li.id = obj.id;
  span.innerText = obj.text;
  button.innerText = "❌";
  button.setAttribute("id", "to-do__btn");
  button.addEventListener("click", deleteTodo);
  toDoList.appendChild(li);
  li.appendChild(button);
  li.appendChild(span);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  toDos.forEach(paintToDo);
}
