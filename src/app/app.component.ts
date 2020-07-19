import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title: string = 'currency-conversion';
  message: string = '';

  receiveMessage($event) {
    if ($event)
      this.message = `${this.message}\n${$event}`;
  }
}
