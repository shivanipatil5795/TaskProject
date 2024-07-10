import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendVerificationEmail(email: string, otp: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: email,
      otp: otp
    };

    return emailjs.send('service_pece31k', 'template_hwd7wpq', templateParams, 'JuoeLKt-RgBurr5ZI');
  }
}
