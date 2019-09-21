import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreChartComponent } from './score-chart.component';

describe('ScoreChartComponent', () => {
  let component: ScoreChartComponent;
  let fixture: ComponentFixture<ScoreChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
