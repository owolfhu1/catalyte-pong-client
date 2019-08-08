import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './record-viewer.component.html',
  styleUrls: ['./record-viewer.component.css']
})
export class RecordViewerComponent implements OnInit {
  games: { gameNumber: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number}[] = [];
  @ViewChild('player') player: ElementRef;
  @ViewChild('playerOne') playerOne: ElementRef;
  @ViewChild('playerTwo') playerTwo: ElementRef;
  names;

  constructor() { }

  ngOnInit() {
    this.getNames();
    setTimeout(() => this.getNames(), 50);
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

  getNames() {
    fetch('https://catalyte-pong.herokuapp.com/players/list', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.names = result;
        this.player.nativeElement.value = null;
        this.playerOne.nativeElement.value = null;
        this.playerTwo.nativeElement.value = null;
      });
  }

  lookupPlayer(player) {
    if (player) {
      fetch('https://catalyte-pong.herokuapp.com/games/player?player=' + player, {mode: 'cors'}).then(res => res.json())
        .then(result => {
          this.games = result;
        });
    }
  }

  lookupPlayers(playerOne, playerTwo) {
    if (playerOne || playerTwo) {
      fetch(`https://catalyte-pong.herokuapp.com/games/vs?playerOne=${playerOne}&playerTwo=${playerTwo}`, {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
          this.games = result;
        });
    }
  }
}
