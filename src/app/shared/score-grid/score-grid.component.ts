import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-score-grid',
  templateUrl: './score-grid.component.html',
  styleUrls: ['./score-grid.component.css']
})
export class ScoreGridComponent implements OnInit {
  @Input() players: {
    id: string,
    rating: number,
    zachRating: number,
    username: string,
    wins: number,
    losses: number
  }[] = [];
  @Output('fetch') fetch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
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
