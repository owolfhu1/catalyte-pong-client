import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
    } else {
      fetch('https://catalyte-pong.herokuapp.com/games/add' +
        `?playerOne=${playerOne}&playerTwo=${playerTwo}&scoreOne=${scoreOne}&scoreTwo=${scoreTwo}`,
        {mode: 'cors'}).then(res => res.text()).then(result => this.text = result);
      this.scoreOne.nativeElement.value = null;
      this.scoreTwo.nativeElement.value = null;
    }
  }

  getNames() {
    fetch('https://catalyte-pong.herokuapp.com/players/list', {mode: 'cors'}).then(res => res.json())
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
