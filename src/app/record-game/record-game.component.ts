import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Strings} from '../constants';

@Component({
  selector: 'app-record-game',
  templateUrl: './record-game.component.html',
  styleUrls: ['./record-game.component.css']
})
export class RecordGameComponent implements OnInit {
  text = 'record a game here';
  names;
  @ViewChild('scoreOne') scoreOne: ElementRef;
  @ViewChild('scoreTwo') scoreTwo: ElementRef;
  @ViewChild('playerOne') playerOne: ElementRef;
  @ViewChild('playerTwo') playerTwo: ElementRef;
  constructor() { }

  ngOnInit() {
    this.getNames();
    setTimeout(() => this.getNames(), 50);
  }

  record(playerOne, playerTwo, scoreOne, scoreTwo) {
    if ((!scoreOne && scoreOne !== 0) || (!scoreTwo && scoreTwo !== 0)) {
      this.text = 'Please enter valid scores';
      setTimeout(() => this.text = 'record a game here', 3000);
    } else {
      const time = new Date().getTime();
      fetch(Strings.URL + 'games/add' +
        `?playerOne=${playerOne}&playerTwo=${playerTwo}&scoreOne=${scoreOne}&scoreTwo=${scoreTwo}&time=${time}`,
        {mode: 'cors'}).then(res => res.text()).then(result => {
          this.text = result;
        setTimeout(() => this.text = 'record a game here', 3000);
      });
      this.scoreOne.nativeElement.value = null;
      this.scoreTwo.nativeElement.value = null;
    }
  }

  getNames() {
    fetch(Strings.URL + 'players/list', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.names = result;
        this.playerOne.nativeElement.value = null;
        this.playerTwo.nativeElement.value = null;
      });
  }

}

/* putting this here️ meh
  ng build --prod --output-path docs --base-href catalyte-pong-client

  When the build is complete, make a copy of docs/index.html and name it docs/404.html.

  Commit your changes and push.

  deployed page at https://owolfhu1.github.io/catalyte-pong-client/.
*/
