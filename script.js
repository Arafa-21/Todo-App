const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    if(input.value.trim() === ""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: input.value,
        completed:false
    });

    input.value="";

    saveTasks();
    renderTasks();
}

function renderTasks(){

    taskList.innerHTML="";

    taskCount.textContent = `Total Tasks: ${tasks.length}`;

    if(tasks.length===0){
        emptyMessage.style.display="block";
    }else{
        emptyMessage.style.display="none";
    }

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`

        <div class="task">
            <input type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${index})">

            <span class="${task.completed ? "completed":""}">
            ${task.text}
            </span>
        </div>

        <div class="actions">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>

        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();

}

function editTask(index){

    const updatedTask = prompt("Edit Task",tasks[index].text);

    if(updatedTask !== null && updatedTask.trim() !== ""){

        tasks[index].text = updatedTask;

        saveTasks();
        renderTasks();

    }

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}
