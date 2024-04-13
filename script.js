const add_task_form = document.querySelector('button');
const newtask = document.getElementById('new-task');
const tasklist = document.getElementById('task-list');

let todos =  JSON.parse(localStorage.getItem("todos")) || [];
let str = "";
let eleIndex;

function showTodos(){
    str = "";
    if(todos.length > 0){
        todos.forEach(ele=>{
            str += `<li style="list-style:none" onclick="ondelete('${ele.title}')">${ele.title}</li> <i onclick="onEdit('${ele.title}')" class="fa-solid fa-pen"></i>` 
         });
        tasklist.innerHTML = str;
    }
}

if(todos){
    showTodos()
}

add_task_form.addEventListener('click',(e)=>{
    e.preventDefault();
    if(add_task_form.innerHTML === "Add"){
        todos.push({title:newtask.value});
    }
    else{
        todos.splice(eleIndex,1,{...todos[eleIndex],title:newtask.value});
        add_task_form.innerHTML = "Add"
    }
    localStorage.setItem("todos",JSON.stringify(todos));
    showTodos()
    newtask.value = "";
});

const ondelete = (title) =>{
    eleIndex = todos.findIndex(ele=>ele.title === title);
    todos.splice(eleIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    showTodos()
}

const onEdit = (title) =>{
  eleIndex = todos.findIndex(ele=>ele.title === title);
  newtask.value = todos[eleIndex].title;
  add_task_form.innerHTML = "Edit"
}