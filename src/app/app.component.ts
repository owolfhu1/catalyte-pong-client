import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = 'Please wait for the API to boot';

  constructor() {
    fetch(`https://catalyte-pong.herokuapp.com/players/test`, {mode: 'cors'})
      .then(res => res.text()).then(result => this.text = result);
  }
}
