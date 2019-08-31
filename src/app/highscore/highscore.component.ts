import { Component, OnInit } from '@angular/core';
import {Strings} from '../constants';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  players: { id: string, rating: number, zachRating: number, username: string , wins: number, losses: number}[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchScores('rating');
  }

  fetchScores(type) {
    fetch(Strings.URL + 'players/scores?type=' + type, {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
  }
}
