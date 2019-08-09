import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './record-viewer.component.html',
  styleUrls: ['./record-viewer.component.css']
})
export class RecordViewerComponent implements OnInit {
  games: { gameNumber: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number, history: []}[] = [];
  @ViewChild('player') player: ElementRef;
  @ViewChild('playerOne') playerOne: ElementRef;
  @ViewChild('playerTwo') playerTwo: ElementRef;
  @ViewChild('player1') player1: ElementRef;
  @ViewChild('player2') player2: ElementRef;
  @ViewChild('score1') score1: ElementRef;
  @ViewChild('score2') score2: ElementRef;
  names;
  hideEdit = true;
  hideHistory = true;
  editing;
  history: { gameNumber: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number}[];

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

  edit(game) {
    this.hideEdit = false;
    this.editing = game;
    this.score1.nativeElement.value = game.scoreOne;
    this.score2.nativeElement.value = game.scoreTwo;
    this.player1.nativeElement.value = game.playerOne;
    this.player2.nativeElement.value = game.playerTwo;
  }

  save(player1, player2, score1, score2, override = false) {
    if (
      player1 !== player2 &&
      this.editing.playerOne !== player1 ||
      this.editing.playerTwo !== player2 ||
      this.editing.scoreOne !== score1 ||
      this.editing.scoreTwo !== score2 ||
      override
    ) {
      this.hideEdit = true;
      // this.editing.playerOne = player1;
      // this.editing.playerTwo = player2;
      // this.editing.scoreOne = score1;
      // this.editing.scoreTwo = score2;
      fetch(`https://catalyte-pong.herokuapp.com/games/update?playerOne=${player1}&playerTwo=${player2
      }&scoreOne=${score1}&scoreTwo=${score2}&gameNumber=${this.editing.gameNumber}`, {mode: 'cors'})
        .then(res => res.text()).then(console.log);
    }
  }

  hideMe() {
    this.hideEdit = true;
    this.hideHistory = true;
  }

  revert(index) {
    this.editing = this.history[index];
    this.save(this.editing.playerOne, this.editing.playerTwo, this.editing.scoreOne, this.editing.scoreTwo, true);
  }

  hist(game) {
    this.editing = game;
    this.history = game.history;
    this.hideHistory = false;
  }
}
