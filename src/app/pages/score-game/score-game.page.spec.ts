import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreGamePage } from './score-game.page';

describe('ScoreGamePage', () => {
  let component: ScoreGamePage;
  let fixture: ComponentFixture<ScoreGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
