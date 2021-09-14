function showTodo(todo) {
    console.log(todo.title + ' - ' + todo.text);
}
var myTodo = {
    title: 'Trash',
    text: 'Take out trash'
};
showTodo(myTodo);
var myTodo2 = {
    title: 1,
    text: 'Take out trash'
};
// showTodo(myTodo2); // error
