import { AlertButtonDepService } from './alert-button-dep.service';
import { Component, OnInit } from '@angular/core';
import { Observable, timer, of } from 'rxjs';

@Component({
  selector: 'app-alert-button-dep',
  templateUrl: './alert-button-dep.component.html',
  styleUrls: ['./alert-button-dep.component.css']
})
export class AlertButtonDepComponent implements OnInit {
  content!: Observable<any>;
  hideContent = true;
  severity = 423;

  constructor(
    private readonly alertButtonDepService: AlertButtonDepService
  ) {}
  ngOnInit(): void {
    this.content = this.alertButtonDepService.getContent();
  }
  toggle() {
    this.hideContent = !this.hideContent;
  }
  toggleAsync() {
    timer(500).subscribe(() => {
      this.toggle();
    });
  }
}
