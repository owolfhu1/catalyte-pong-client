import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  players: { id: string, rating: number, username: string , wins: number, losses: number}[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchScores('rating');
  }

  fetchScores(type) {
    fetch('https://catalyte-pong.herokuapp.com/players/scores?type=' + type, {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
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

  winPercent(player) {
    const wins = player.wins;
    const total = player.wins + player.losses;
    const result = wins / total * 100;
    return this.round(result) + '%';
  }
}
