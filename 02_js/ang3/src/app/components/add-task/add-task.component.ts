import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string = '';
  day: string = '';
  reminder: boolean = false;

  showAddTask: boolean = false;
  subsription: Subscription;

  constructor(private uiService: UiService) {
    this.subsription = this.uiService.onToggle().subscribe(value => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) return alert('Please add a task!');

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
