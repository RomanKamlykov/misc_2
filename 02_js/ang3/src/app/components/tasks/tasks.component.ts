import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Array<Task> =[];
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(el => el.id !== task.id);
      console.log(`Task ${task.id} deleted`);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;

    this.taskService.updateTaskReminder(task).subscribe(() => {
      console.log(`Task ${task.id} updated`);
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
      console.log(`Task added`);
    });
  }
}
