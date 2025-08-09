//first thing to do is to take elements from html and store them in varible.

const taskinput = document.getElementById("taskinput")
const tasklist =  document.getElementById("tasklist")
const addtask = document.getElementById("addtask")

function addTask() {

    const text = taskinput.value.trim();
    if(!text) retun; 


    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = text;
    li.appendChild(span);


    const complete = document.createElement('button')
    complete.textContent = 'complete'
    complete.style.marginLeft = '10px'

    complete.addEventListener('click',() =>{
      li.classList.toggle('completed')
    })

    li.appendChild(complete)
    tasklist.appendChild(li);
    taskinput.value = '';
    taskinput.focus();
}
  addtask.addEventListener('click', addTask);
  
