import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './record-viewer.component.html',
  styleUrls: ['./record-viewer.component.css']
})
export class RecordViewerComponent implements OnInit {
  games: { gameNumber: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number}[] = [];

  constructor() { }

  ngOnInit() {
  }

  viewAll() {
    fetch('https://catalyte-pong.herokuapp.com/games/all', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.games = result;
      });
  }

  clear() {
    this.games = [];
  }
}
