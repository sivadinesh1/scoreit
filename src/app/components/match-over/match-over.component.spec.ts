import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchOverPage } from './match-over.page';

describe('MatchOverPage', () => {
  let component: MatchOverPage;
  let fixture: ComponentFixture<MatchOverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchOverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchOverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
