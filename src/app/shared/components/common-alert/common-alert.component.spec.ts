import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAlertComponent } from './common-alert.component';

describe('CommonAlertComponent', () => {
  let component: CommonAlertComponent;
  let fixture: ComponentFixture<CommonAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
