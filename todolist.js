const textInput = document.querySelector("#text");
const tasks = document.querySelector(".tasks");
const clear = document.querySelector(".btn");
const allSection = document.querySelector(".all");
const completedSection = document.querySelector(".completed");
const pendingSection = document.querySelector(".pending");

let completedTasks = [];
let pendingTasks = [];
let allTasks = [];

textInput.addEventListener("keydown", event => {
    // event.preventDefault();
    if(event.key === "Enter"){
       
        const todoItem = document.createElement("li");
        todoItem.draggable = true;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${Math.random().toString(36).substring(2, 15)}`;;

        const label = document.createElement("label");
        label.appendChild(document.createTextNode(`${textInput.value}`));
        label.htmlFor = checkbox.id;

        const ellipsis = document.createElement('span');
        ellipsis.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(ellipsis);

        todoItem.classList = "task"
        tasks.appendChild(todoItem);

        allSection.style.color = 'red';
        textInput.value = "";

        allTasks.push(todoItem);
        pendingTasks.push(todoItem);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                completedTasks.push(todoItem);
                pendingTasks = pendingTasks.filter(task => task !== todoItem);
            } else {
                pendingTasks.push(todoItem);
                completedTasks = completedTasks.filter(task => task !== todoItem);
            }
        });

        todoItem.addEventListener('dragstart', () => {
            todoItem.classList.add('dragging'); 
        });

        todoItem.addEventListener('dragend', () => {
            todoItem.classList.remove('dragging'); 
        });

        tasks.addEventListener('dragover', event => {
            event.preventDefault();
            const afterElement = getDragAfterElement(tasks, event.clientY);
            const draggingElement = document.querySelector('.dragging');
            if (afterElement == null) {
                tasks.appendChild(draggingElement);
            } else {
                tasks.insertBefore(draggingElement, afterElement);
            }
        });
    }
});


allSection.addEventListener("click", event => {
    allSection.style.color = 'red';
    pendingSection.style.color = "";
    completedSection.style.color = "";

    tasks.innerHTML = ''; 

    for (const task of allTasks) {
        tasks.appendChild(task);
    }
   
});

pendingSection.addEventListener("click", event => {
    pendingSection.style.color = 'red';
    allSection.style.color = '';
    completedSection.style.color = "";
    tasks.innerHTML = ''; 

    for(const task of pendingTasks){
        tasks.appendChild(task);
    }
});


completedSection.addEventListener("click", event => {
    completedSection.style.color = 'red';
    allSection.style.color = '';
    pendingSection.style.color = "";
    tasks.innerHTML = ''; 

    for (const task of completedTasks) {
        tasks.appendChild(task);
    }

});


clear.addEventListener("click", event =>{
    tasks.innerHTML = ''; 
    completedTasks = [];
    pendingTasks = [];
    allTasks = [];
    allSection.style.color = "";
    pendingSection.style.color = "";
    completedSection.style.color = "";
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}