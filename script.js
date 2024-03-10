const add_task_form = document.getElementById('add-task-form');
const newtask = document.getElementById('new-task');
const tasklist = document.getElementById('task-list');

let json = JSON.parse(localStorage.getItem('todos'));
// console.log(json);

let index = 0;
let str = ``;
let findData;
let edit = false;

const showTodoitems = () => {
    str = "";
    json.forEach(ele => {
        str += `<li onclick="ondelete(${ele.id})">${ele.text}</li> <i onclick="onEdit(${ele.id})" class="fa-solid fa-pen"></i>`
    })
    tasklist.innerHTML = str;
}

if (json) {
    showTodoitems()
}
else {
    tasklist.innerHTML = "No items in Todos";
}

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    if (edit) {
        let updateData = {...findData,text:newtask.value}
        let indexforedit = json.findIndex(ele=>ele.id == findData.id);
        json.splice(indexforedit, 1, updateData);
        localStorage.setItem('todos', JSON.stringify(json));
        edit = false;
        document.querySelector('button').innerHTML = "Add";
    }
    else {
        if (!json) {
            json = [];
            index = 0;
            json.push({ id: index, text: newtask.value })
            localStorage.setItem("todos", JSON.stringify(json))
        }
        else {
            json = JSON.parse(localStorage.getItem('todos'));
            index++;
            json.push({ id: index, text: newtask.value })
            localStorage.setItem("todos", JSON.stringify(json))
        }
    }
    showTodoitems();
    newtask.value = "";
});


function ondelete(i) {
    let jsonindex = json.findIndex(ele => ele.id == i)
    json.splice(jsonindex, 1);
    localStorage.setItem('todos', JSON.stringify(json));
    showTodoitems()

}

function onEdit(i) {
    let jsonindex = json.findIndex(ele => ele.id == i)
    newtask.value = json[jsonindex].text;
    edit = true
    document.querySelector('button').innerHTML = "Edit";
    findData = json.find(ele=>ele.text == newtask.value);
}


