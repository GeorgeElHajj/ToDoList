let inputs = document.getElementById("taskInput");
let text = document.querySelector(".text");

function Add() {
    if (inputs.value === "") {
        alert("Please Enter Task");
    } else {
        // Create a new task element
        let newTask = createTaskElement(inputs.value);

        // Clear the task input
        inputs.value = "";

        // Add the new task to the task list
        text.appendChild(newTask);
    }
}

function createTaskElement(taskText) {
    // Create a container for the task
    let taskContainer = document.createElement("div");
    taskContainer.className = "task";

    // Create a checkbox for task status
    let checkTask = createCheckbox();
    checkTask.className="check";
    // Add the checkbox to the task container
    taskContainer.appendChild(checkTask);

    // Create a span element for the task text
    let taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskContainer.appendChild(taskTextElement);

    // Create icons for editing and deleting tasks
    let editIcon = createIcon("fa fa-edit", edit);
    let deleteIcon = createIcon("fa fa-trash-o", remove);

    // Add icons to the task container
    taskContainer.appendChild(editIcon);
    taskContainer.appendChild(deleteIcon);

    // Attach event listeners for editing, removing, and toggling task status
    editIcon.addEventListener("click", edit);
    deleteIcon.addEventListener("click", remove);
    checkTask.addEventListener("change", toggleTaskStatus);

    return taskContainer;
}

function createCheckbox() {
    let checkTask = document.createElement("input");
    checkTask.type = "checkbox";
    checkTask.className = "task-checkbox";
    return checkTask;
}

function createIcon(className, clickHandler) {
    let icon = document.createElement("i");
    icon.className = className;
    icon.addEventListener("click", clickHandler);
    return icon;
}

function remove() {
    var x = confirm("Are you sure you want to remove this task?");
    if (x === true) {
        this.parentElement.remove();
    }
}

function edit() {
    // Create an input field for editing the task
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = this.parentElement.querySelector("span").textContent;
    
    this.parentElement.querySelector("span").style.display = "none";
    
    // Replace the task text with the edit input
    this.parentElement.insertBefore(editInput, this);
    
    // Add a blur event listener to the input field to save changes when it loses focus
    editInput.addEventListener("blur", saveEdit.bind(this, editInput));
    editInput.focus();
}

function saveEdit(editInput) {
    // Get the edited task text
    let editedTaskText = editInput.value;
    
    // Update the task element with the edited text
    this.parentElement.querySelector("span").textContent = editedTaskText;
    this.parentElement.querySelector("span").style.display = "inline";
    
    // Remove the edit input element
    editInput.remove();
}

function toggleTaskStatus() {
    if (this.checked) {
        // If the checkbox is checked, mark the task as completed
        this.parentElement.querySelector("span").style.textDecoration = "line-through";
    } else {
        // If the checkbox is unchecked, mark the task as pending
        this.parentElement.querySelector("span").style.textDecoration = "none";
    }
}
