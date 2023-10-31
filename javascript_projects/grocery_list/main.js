const submitButton = document.getElementById("submitButton");
const staplesButton = document.getElementById("staplesButton");
const clearButton = document.getElementById("clearButton");
const userInput = document.getElementById("userInput");
const ul = document.getElementById("list");
const sl = document.getElementById("sideList");

let todoList = [];
const staples = [
  "spinach",
  "lettuce",
  "peppers",
  "avocados",
  "berries",
  "onions",
  "garlic",
  "apples",
  "bananas",
  "bread",
  "beef",
  "chicken",
  "lunch meat",
  "cheese",
  "cottage cheese",
  "sour cream",
  "yogurt",
  "milk",
  "eggs",
  "cereal",
];
let savedTodos;
let draggables = [];

function store() {
  savedTodos = JSON.stringify(todoList);
  localStorage.setItem("todoList", savedTodos);
}

function addTodo(text) {
  // text.toLowerCase();
  const todo = {
    text,
    checked: false,
    id: Math.ceil(Math.random() * 1000000),
  };
  //avoid doubles by using todoList.map() to get an array of just the text property and check if the new item is present
  let items = todoList.map((a) => a.text);
  //if it is not present, add it to the list
  if (!items.includes(todo.text)) {
    todoList.push(todo);
    renderTodo(todo);
    store();
  }
}

staplesButton.addEventListener("click", addStaples);
function addStaples() {
  for (let i = 0; i < staples.length; i++) {
    addTodo(staples[i]);
  }
  // staples.forEach(item => addTodo(item));
  // userInput.focus();
}

function toggleDone(key) {
  const index = todoList.findIndex((item) => item.id === Number(key));
  todoList[index].checked = !todoList[index].checked;
  renderTodo(todoList[index]);
  store();
}

function removeTodo(key) {
  const index = todoList.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoList[index],
  };
  todoList = todoList.filter((item) => item.id !== Number(key));
  renderTodo(todo);
  store();
}

const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (text !== "") {
    addTodo(text.toLowerCase());
    userInput.value = "";
    userInput.focus();
  }
});

function renderTodo(todo) {
  const isChecked = todo.checked ? "done" : "";
  const item = document.querySelector(`[data-key='${todo.id}']`);
  let li = document.createElement("li");
  li.setAttribute("class", `item ${isChecked} draggable`);
  li.setAttribute("draggable", `true`);
  li.setAttribute("data-key", todo.id);
  li.innerHTML = `
  <div id="${todo.id}" class="itemButton checkBox"></div>
  <span class="item">${todo.text}</span>
  <div id="delete${todo.id}" class="itemButton delete">X</div>
  `;

  if (todo.deleted) {
    item.remove();
    if (todoList.length === 0) list.innerHTML = "";
    return;
  }
  if (item) {
    ul.replaceChild(li, item);
    setDrag(li);
  } else {
    ul.append(li);
    setDrag(li);
  }
}
ul.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("item") ||
    e.target.classList.contains("checkBox")
  ) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const itemKey = e.target.parentElement.dataset.key;
    removeTodo(itemKey);
  }
});

function clearList() {
  ul.innerHTML = "";
  //setting the array.length to 0 clears it easily. Could otherwise .splice(0, array.length). Both are similar in performance.
  todoList.length = 0;
  store();
}
clearButton.addEventListener("click", clearList);

window.addEventListener("load", () => {
  const ref = localStorage.getItem("todoList");
  if (ref) {
    savedTodoList = JSON.parse(ref);
    savedTodoList.forEach((todo) => {
      let items = todoList.map((a) => a.text);
      if (!items.includes(todo.text)) {
        todoList.push(todo);
        renderTodo(todo);
      }
    });
  }
});

//MAKES THE ITEMS DRAGGABLE AND RE-ARRANGABLE
function setDrag(item) {
  draggables = document.querySelectorAll(".draggable");
  //FOR PC
  item.addEventListener("dragstart", () => {
    console.log("Dragging...");
    item.classList.toggle("dragging");
  });
  item.addEventListener("dragend", () => {
    console.log("Done");
    item.classList.toggle("dragging");
  });
  //FOR MOBILE (TOUCH SCREEN)
  item.addEventListener("touchstart", () => {
    console.log("Dragging...");
    item.classList.toggle("dragging");
  });
  item.addEventListener("touchend", () => {
    console.log("Done");
    item.classList.toggle("dragging");
  });
}

groceryList = document.querySelector(".groceryList");
//FOR PC
groceryList.addEventListener("dragover", (e) => {
  const draggable = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(groceryList, e.clientY);
  e.preventDefault();
  if (afterElement == null) {
    groceryList.appendChild(draggable);
  } else {
    groceryList.insertBefore(draggable, afterElement);
  }
});
//FOR MOBILE (TOUCH SCREEN)
groceryList.addEventListener("touchmove", (e) => {
  const draggable = document.querySelector(".dragging");
  const touchLocation = e.targetTouches[0];
  const afterElement = getDragAfterElement(groceryList, touchLocation.clientY);
  e.preventDefault();
  if (afterElement == null) {
    groceryList.appendChild(draggable);
  } else {
    groceryList.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(groceryList, y) {
  const draggableElements = [
    ...groceryList.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
