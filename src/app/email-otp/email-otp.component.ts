import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp.component.html',
  styleUrl: './email-otp.component.css'
})
export class EmailOTPComponent {
  registrationForm: FormGroup;
  submitted = false;
  isEmailVerified = false;
  otpSent = false;
  otp: string = '';
  showVerifyButton = true;
backgroundImage: any;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+@[a-z]+[.][a-z]+")]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')]],
      confirmPassword: [{ value: '', disabled: true }, Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

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

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  sendOtp() {
    this.otp = this.generateOtp();
    localStorage.setItem('otp', this.otp);
    this.otpSent = true;
    console.log('Generated OTP:', this.otp); 
  }

  verifyEmail() {
    this.submitted = true;
    if (this.registrationForm.controls['email'].invalid) {
      return;
    }
    this.sendOtp();
    this.showOtpPopup();
  }

  showOtpPopup() {
    Swal.fire({
      title: 'Email Verification',
      input: 'text',
      inputLabel: 'Enter the OTP sent to your email',
      showCancelButton: true,
      confirmButtonText: 'Verify OTP',
      cancelButtonText: 'Resend OTP',
      showLoaderOnConfirm: true,
      preConfirm: (enteredOtp) => {
        return this.confirmOtp(enteredOtp);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Verified!', 'Your email has been verified.', 'success');
        this.isEmailVerified = true;
        this.showVerifyButton = false;
        this.registrationForm.controls['password'].enable();
        this.registrationForm.controls['confirmPassword'].enable();
        localStorage.removeItem('otp'); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.resendOtp();
      }
    });
  }

  confirmOtp(enteredOtp: string) {
    const storedOtp = localStorage.getItem('otp');
    return new Promise((resolve, reject) => {
      if (enteredOtp === storedOtp) {
        resolve(true);
      } else {
        Swal.fire('Invalid OTP', 'Please try again.', 'error');
        reject(false);
      }
    });
  }

  resendOtp() {
    this.sendOtp();
    this.showOtpPopup();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid || !this.isEmailVerified) {
      return;
    }

    const userData = this.registrationForm.value;
    console.log('User Data:', userData); 

    
    localStorage.setItem('user', JSON.stringify(userData));
    Swal.fire('Success', 'Registration successful!', 'success');
  }
}
