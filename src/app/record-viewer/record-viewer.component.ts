import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './record-viewer.component.html',
  styleUrls: ['./record-viewer.component.css']
})
export class RecordViewerComponent implements OnInit {
  @ViewChild('player') player: ElementRef;
  @ViewChild('playerOne') playerOne: ElementRef;
  @ViewChild('playerTwo') playerTwo: ElementRef;
  @ViewChild('player1') player1: ElementRef;
  @ViewChild('player2') player2: ElementRef;
  @ViewChild('score1') score1: ElementRef;
  @ViewChild('score2') score2: ElementRef;
  @ViewChild('low') low: ElementRef;
  @ViewChild('high') high: ElementRef;
  games: { time: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number, history: []}[] = [];
  history: { time: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number}[];
  names: string[] = [];
  hideEdit = true;
  hideHistory = true;
  editing;
  lastCall;
  lowFilter;
  highFilter;
  single = 'someone';
  a = 'a';
  b = 'b';
  constructor() { }

  ngOnInit() {
    this.getNames();
    setTimeout(() => this.getNames(), 50);
  }

  viewAll() {
    this.lastCall = () => this.viewAll();
    fetch('https://catalyte-pong.herokuapp.com/games/all', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.games = result;
        this.takeGames(result);
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
    this.lastCall = () => this.lookupPlayer(player);
    if (player) {
      fetch('https://catalyte-pong.herokuapp.com/games/player?player=' + player, {mode: 'cors'}).then(res => res.json())
        .then(result => {
          this.games = result;
          this.takeGames(result);
        });
    }
  }

  lookupPlayers(playerOne, playerTwo) {
    this.lastCall = () => this.lookupPlayers(playerOne, playerTwo);
    if (playerOne || playerTwo) {
      fetch(`https://catalyte-pong.herokuapp.com/games/vs?playerOne=${playerOne}&playerTwo=${playerTwo}`, {mode: 'cors'})
        .then(res => res.json())
        .then(result => {
          this.games = result;
          this.takeGames(result);
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
      this.hideMe();
      fetch(`https://catalyte-pong.herokuapp.com/games/update?playerOne=${player1}&playerTwo=${player2
      }&scoreOne=${score1}&scoreTwo=${score2}&time=${this.editing.time}`, {mode: 'cors'})
        .then(res => res.text()).then(this.lastCall);
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

  get hasHistory() {
    let has = false;
    this.games.forEach(game => has = game.history.length > 0 ? true : has);
    return has;
  }

  formatDate(time) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(time);
    const m = date.getHours() > 11 ? 'pm' : 'am';
    const mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const timeFormat = `${m === 'am' ? date.getHours() : date.getHours() - 11}:${mins} ${m}`;
    return `${days[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - 2000} at ${timeFormat}`;
  }

  lowChange($event) {
    if ($event.target.validity.valid) {
      this.lowFilter = $event.target.valueAsNumber;
    }
  }

  highChange($event) {
    if ($event.target.validity.valid) {
      this.highFilter = $event.target.valueAsNumber;
    }
  }

  showGame(time) {
    if (this.lowFilter && this.highFilter) {
      return this.lowFilter < time && (this.highFilter + 86400000) > time;
    } else { return true; }
  }

  reset() {
    this.lowFilter = undefined;
    this.highFilter = undefined;
    this.low.nativeElement.value = undefined;
    this.high.nativeElement.value = undefined;
  }

  changeSingle($event) {
    this.single = $event.target.value;
  }

  changePersonA($event) {
    this.a = $event.target.value;
  }

  changePersonB($event) {
    this.b = $event.target.value;
  }

  takeGames(result) {
    if (result.length > 0) {
      const lowerd = new Date(result[0].time);
      const lower = new Date(`${lowerd.getMonth() + 1}-${lowerd.getDate()}-${lowerd.getFullYear()}`).getTime();
      const upperd = new Date(result[result.length - 1].time);
      const upper = new Date(`${upperd.getMonth() + 1}-${upperd.getDate()}-${upperd.getFullYear()}`).getTime();
      this.low.nativeElement.valueAsNumber = lower;
      this.lowFilter = lower;
      this.high.nativeElement.valueAsNumber = upper;
      this.highFilter = upper;
    }
  }

  get filteredGames(): { time: number, playerOne: string, playerTwo: string, scoreOne: number, scoreTwo: number, history: []}[] {
    const list = [];
    this.games.forEach(game => {
      if (this.showGame(game.time)) {
        list.push(game);
      }
    });
    return list;
  }
}
