import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertButtonDepService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  getContent() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
