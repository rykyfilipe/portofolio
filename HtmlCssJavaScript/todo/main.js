const todoList = [];

window.onload = function() {
    render_todoList();
    document.querySelector('.btn').addEventListener('click', () => { addTodo(); } );
};

function render_todoList() {

    let todoListHTML = '';

    for(let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i];
        const { name, dueDate } = todoObject;

        const html = `
            <p>
            ${name} ${dueDate}
            <button class="delete-btn">Delete</button>
            </p>`;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
    if (todoList.length == 0){
        document.querySelector('.js-todo-list').innerHTML = `<p>Congrat! You finished all tasks.</p>`;
    }

    document.querySelectorAll('.delete-btn').forEach((deleteButton, index) =>{
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            render_todoList();
        })
    });
}


function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const dateElement = document.querySelector('.js-due-date-input');
    const name = inputElement.value;
    const date = dateElement.value;

    if(name === '' || date === ''){
        alert("Empty name or undefined date!");
    }
    else
    {

        todoList.push(
            {
                name:name,
                dueDate:date
            }
        );

        inputElement.value = '';

        render_todoList();
    }
}