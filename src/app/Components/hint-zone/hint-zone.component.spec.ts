import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintZoneComponent } from './hint-zone.component';

describe('HintZoneComponent', () => {
  let component: HintZoneComponent;
  let fixture: ComponentFixture<HintZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
