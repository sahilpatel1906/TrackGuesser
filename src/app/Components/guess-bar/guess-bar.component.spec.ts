import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessBarComponent } from './guess-bar.component';

describe('GuessBarComponent', () => {
  let component: GuessBarComponent;
  let fixture: ComponentFixture<GuessBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
