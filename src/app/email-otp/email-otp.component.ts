import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { ChangeDetectorRef } from '@angular/core';

import { EmailService } from '../email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp.component.html',
  styleUrl: './email-otp.component.css'
})
export class EmailOTPComponent {
  registrationForm: FormGroup;
  submitted = false;
  otp!: string;
  isEmailVerified: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^.{3,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registrationForm.controls; }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  verifyEmail() {
    this.otp = this.generateOTP();
    const email = this.registrationForm.get('email')?.value;

    this.emailService.sendVerificationEmail(email, this.otp).then(
      () => {
        this.promptForOTP();
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to send verification email. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Failed to send email:', error);
      }
    );
  }
  

  promptForOTP() {
    Swal.fire({
      title: 'Enter OTP',
      input: 'text',
      inputPlaceholder: 'Enter your OTP',
      showCancelButton: true,
      confirmButtonText: 'Verify',
      showLoaderOnConfirm: true,
      preConfirm: (enteredOtp) => {
        return new Promise((resolve, reject) => {
          if (this.otp === enteredOtp) {
            this.isEmailVerified = true;
            resolve(true);
          } else {
            reject('Invalid OTP. Please try again.');
          }
        }).catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: 'OTP verified successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid || !this.isEmailVerified) {
      return;
    }

    Swal.fire({
      title: 'Registration successful',
      text: 'You have successfully registered.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

   
  }


}
