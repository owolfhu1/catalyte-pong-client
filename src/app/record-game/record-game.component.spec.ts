import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordGameComponent } from './record-game.component';

describe('RecordGameComponent', () => {
  let component: RecordGameComponent;
  let fixture: ComponentFixture<RecordGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
