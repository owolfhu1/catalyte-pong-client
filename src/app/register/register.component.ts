import { Component, OnInit } from '@angular/core';

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
    fetch(`https://catalyte-pong.herokuapp.com/players/register?username=${value}`, {mode: 'cors'})
      .then(res => res.text()).then(result => this.text = result);
  }
}
