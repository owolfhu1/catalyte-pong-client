import { Component, OnInit } from '@angular/core';
import {Strings} from '../constants';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  players: { id: string, rating: number, zachRating: number, username: string , wins: number, losses: number}[] = [];
  season: { id: string, start: number, end: number } = { id: '', start: 0, end: 0 };
  seasons: { id: string, start: number, end: number }[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchCurrent();
  }

  fetchCurrent() {
    fetch(Strings.URL + 'seasons/current', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
    fetch(Strings.URL + 'seasons/currentObj', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.season = result;
      });
    fetch(Strings.URL + 'seasons/all', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.seasons = result;
      });
  }

  formatSeason(s) {
    const start = new Date(s.start).toLocaleDateString();
    const end = s.end ? new Date(s.end).toLocaleDateString() : 'present';
    return `${start} - ${end}`;
  }

  fetch(type) {
    fetch(Strings.URL + `seasons/scores?type=${type}&id=${this.season.id}`, {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
  }

  setSeason(s) {
    this.season = s;
    fetch(Strings.URL + `seasons/scores?type=rating&id=${this.season.id}`, {mode: 'cors'}).then(res => res.json())
      .then(result => {
        this.players = result;
      });
  }

  end(pass) {
    fetch(Strings.URL + `seasons/end?word=${pass}&time=${new Date().getTime()}`, {mode: 'cors'}).then(res => res.text())
      .then(result => {
        console.log('end', result);
      });
  }
}
