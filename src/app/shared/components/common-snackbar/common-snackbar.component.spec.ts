import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSnackbarComponent } from './common-snackbar.component';

describe('CommonSnackbarComponent', () => {
  let component: CommonSnackbarComponent;
  let fixture: ComponentFixture<CommonSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
