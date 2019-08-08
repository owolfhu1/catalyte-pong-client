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
    this.players = [];
    fetch('https://catalyte-pong.herokuapp.com/players/scores?type=' + type, {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
  }

  format(rating) {
    rating = rating + '';
    return rating.split('.')[0];
  }
}
