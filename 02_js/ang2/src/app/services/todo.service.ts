import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Contetn-Type': 'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // todosUrl = "https://jsonplaceholder.typicode.com/todos?_limit=5";
  todosUrl = "https://jsonplaceholder.typicode.com/todos";
  todosLimit = "?_limit=5";

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    // return [
    //   {
    //     id: 1,
    //     title: 'Todo One',
    //     completed: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Todo Two',
    //     completed: true
    //   },
    //   {
    //     id: 3,
    //     title: 'Todo Three',
    //     completed: false
    //   },
    // ];
    return this.http.get<Todo[]>(this.todosUrl + this.todosLimit);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}`;
    return this.http.post<Todo>(url, todo, httpOptions);
  }
}
