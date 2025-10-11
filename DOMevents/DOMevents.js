let tasks = [];

function taskTemplate(task) {
    return `
        <li ${task.completed ? 'class="strike"':""}>
            <p>${task.detail}</p>
            <div>
                <span data-action="delete">❎</span>
                <span data-action="complete">✅</span>
            </div>
        </li>`
}
function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  const html = tasks.map(taskTemplate).join("");
  listElement.innerHTML = html;
}

function newTask() {
  const task = document.querySelector("#todo").value;
  tasks.push({detail:task, completed: false});
  renderTasks(tasks);
}

function removeTask(taskElement) {
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  taskElement.classList.toggle("strike");
  console.log(tasks);
}

function manageTasks(event) {
  console.log(event.target);
  const parent = event.target.closest("li");
  if (event.target.dataset.action === "delete") {
    removeTask(parent);
  }
  if (event.target.dataset.action === "complete") {
    completeTask(parent);
  }
}
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

renderTasks(tasks);