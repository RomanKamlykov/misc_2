import { Component } from "@angular/core";
import { CoursesService } from "./courses.service";

@Component({
  selector: 'app-courses',
  template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
      <li *ngFor="let course of courses">{{ course }}</li>
    </ul>
  `,
})

export class CoursesComponent {
  title = 'List of courses';
  getTitle() { return this.title; }
  // courses = ["course 1", "course 2", "course 3"];
  courses;

  // constructor() {
  //   let service = new CoursesService();
  //   this.courses = service.getCourses();
  // }

  constructor(service: CoursesService) {
    this.courses = service.getCourses();
  }
}
