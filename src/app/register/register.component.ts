import { Component, OnInit } from '@angular/core';
import {Strings} from '../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  text = 'register new players here';
  constructor() { }

  ngOnInit() {
  }

  register(value) {
    if (/^[a-zA-Z]+$/.test(value)) {
      fetch(Strings.URL + `players/register?username=${value}`, {mode: 'cors'})
        .then(res => res.text()).then(result => {
          this.text = result;
          setTimeout(() => this.text = 'register new players here', 3000);
        }
      );
    } else {
      this.text = 'please enter only letters';
      setTimeout(() => this.text = 'register new players here', 3000);
    }
  }
}
