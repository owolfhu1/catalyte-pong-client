import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-game',
  templateUrl: './record-game.component.html',
  styleUrls: ['./record-game.component.css']
})
export class RecordGameComponent implements OnInit {
  text = 'record a game here';

  constructor() { }

  ngOnInit() {
  }

  record(playerOne, playerTwo, scoreOne, scoreTwo) {
    fetch('https://catalyte-pong.herokuapp.com/games/add' +
      `?playerOne=${playerOne}&playerTwo=${playerTwo}&scoreOne=${scoreOne}&scoreTwo=${scoreTwo}`,
      {mode: 'cors'}).then(res => res.text()).then(result => this.text = result);
  }

}
