import {Component, ElementRef, ViewChild} from '@angular/core';
import {Strings} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiBooted = false;
  @ViewChild('selection') selection: ElementRef;

  selected;

  constructor() {
    fetch(Strings.URL + `players/test`, {mode: 'cors'})
      .then(res => res.text()).then(() => {
        this.apiBooted = true;
        this.selection.nativeElement.value = null;
      }
    );
  }

  get showRegister() {
    return this.selected === 'register';
  }

  get showRecorder() {
    return this.selected === 'record';
  }

  get showGameLookup() {
    return this.selected === 'lookup';
  }

  get showHighscores() {
    return this.selected === 'highscores';
  }

  get showExpectation() {
    return this.selected === 'expectation';
  }

  get showSeasons() {
    return this.selected === 'seasons';
  }

  get showGraph() {
    return this.selected === 'graph';
  }

  onSelectionChange() {
    this.selected = this.selection.nativeElement.value;
  }
}
