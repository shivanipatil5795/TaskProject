import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOTPComponent } from './email-otp.component';

describe('EmailOTPComponent', () => {
  let component: EmailOTPComponent;
  let fixture: ComponentFixture<EmailOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailOTPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
