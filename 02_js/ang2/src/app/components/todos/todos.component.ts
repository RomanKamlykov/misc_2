import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos!: Array<Todo>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // this.todos = this.todoService.getTodos();
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // delete from UI
    this.todos = this.todos.filter(el => el.id !== todo.id);
    // delete from server
    this.todoService.deleteTodo(todo).subscribe(() => {
      console.log("todo is deleted");
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe((createdTodo: Todo) => {
      this.todos.push(createdTodo);
    });
  }
}
