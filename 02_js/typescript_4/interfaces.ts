interface Todo {
  title: string;
  text: string;
}

function showTodo(todo: Todo): void {
  console.log(todo.title + ' - ' + todo.text); 
}

const myTodo = {
  title: 'Trash',
  text: 'Take out trash'
}

showTodo(myTodo);

const myTodo2 = {
  title: 1,
  text: 'Take out trash'
}
// showTodo(myTodo2); // error
