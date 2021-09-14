import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <p>
      <button>{{ value }}</button>
    </p>
  `,
  styles: [
    'button { width: 100%; height: 100%; font-size: 5em !important; }'
  ]
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | undefined;
}
