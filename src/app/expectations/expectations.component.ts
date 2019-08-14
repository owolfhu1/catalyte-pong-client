import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-expectations',
  templateUrl: './expectations.component.html',
  styleUrls: ['./expectations.component.css']
})
export class ExpectationsComponent implements OnInit {
  names = [];
  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;

  msg;

  ngOnInit() {
    this.getNames();
  }

  round(number) {
    const roundUp = ['5', '6', '7', '8', '9'];
    number = number + '';
    const split = number.split('.');
    let result = split[0] * 1;
    if (split.length > 1) {
      const firstDecimal = split[1].substring(0, 1);
      if (roundUp.includes(firstDecimal)) {
        result++;
      }
    }
    return result;
  }

  getNames() {
    fetch('https://catalyte-pong.herokuapp.com/players/list', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.names = result;
        this.one.nativeElement.value = null;
        this.two.nativeElement.value = null;
      });
  }

  getExpectation() {
    const one = this.one.nativeElement.value;
    const two = this.two.nativeElement.value;
    if (one && two) {
      fetch(`https://catalyte-pong.herokuapp.com/players/expect?playerOne=${one}&playerTwo=${two}`, {mode: 'cors'}).then(res => res.json())
        .then(result => {
          this.msg = ` ${this.round(100 * result[0])}% vs ${this.round(100 * result[1])}%`;
        });
    }
  }
}
