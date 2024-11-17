document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task-input");
    const taskList = document.getElementById("task-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.style.display = task.completed ? "none" : "inline";
        checkbox.addEventListener("change", () => {
          task.completed = !task.completed;
          saveTasks();
          renderTasks();
        });
  
        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = `task-text ${task.completed ? "completed" : ""}`;
        span.addEventListener("dblclick", () => {
          const input = document.createElement("input");
          input.type = "text";
          input.value = task.text;
          input.className = "edit-mode";
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              task.text = input.value;
              saveTasks();
              renderTasks();
            }
          });
          li.replaceChild(input, span);
          input.focus();
        });
  
        const timestamp = document.createElement("span");
        timestamp.className = "task-timestamp";
        timestamp.textContent = task.timestamp;
  
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "task-delete";
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
  
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(timestamp);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && taskInput.value.trim()) {
        const newTask = {
          text: taskInput.value.trim(),
          completed: false,
          timestamp: new Date().toLocaleString(),
        };
        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    });
  
    renderTasks();
  });
  