import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RecordGameComponent } from './record-game/record-game.component';
import { RecordViewerComponent } from './record-viewer/record-viewer.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { ExpectationsComponent } from './expectations/expectations.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { ScoreGridComponent } from './shared/score-grid/score-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RecordGameComponent,
    RecordViewerComponent,
    HighscoreComponent,
    ExpectationsComponent,
    SeasonsComponent,
    ScoreGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
