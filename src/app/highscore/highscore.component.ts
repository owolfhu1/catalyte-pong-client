import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  players: { id: string, rating: number, username: string }[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchScores();
  }

  fetchScores() {
    this.players = [];
    fetch('https://catalyte-pong.herokuapp.com/players/scores', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
  }

  format(rating) {
    rating = rating + '';
    return rating.split('.')[0];
  }
}
