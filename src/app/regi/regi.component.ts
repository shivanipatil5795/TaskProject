import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regi',
  templateUrl: './regi.component.html',
  styleUrl: './regi.component.css'
})
export class RegiComponent {

  registerForm = new FormGroup({

    fullname: new FormControl('',[Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required,Validators.pattern("[a-zA-Z0-9]+@[a-z]+[.][a-z]+")]),

    mo_no: new FormControl('',[
    Validators.required,
    Validators.pattern("^[7-9][0-9]{9}$"),
    Validators.maxLength(10),
    Validators.minLength(10),
    ]),

    username: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$'),
      Validators.maxLength(6),
      Validators.minLength(10),
    ]),

    pass: new FormControl('',[
      Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$'),
    Validators.maxLength(6),
    Validators.minLength(10),
    ]),
  });

  registerSubmited(){
    console.log(this.registerForm.get("fullname"));
    }

    get fullname(): FormControl{
      return this.registerForm.get("fullname") as FormControl;
    }

    get email(): FormControl{
      return this.registerForm.get("email") as FormControl;
    }

    get mo_no(): FormControl{
      return this.registerForm.get("mo_no") as FormControl;
    }

    get username(): FormControl{
      return this.registerForm.get("username") as FormControl;
    }

    get pass(): FormControl{
      return this.registerForm.get("pass") as FormControl;
    }

    mailesent(){
      console.log(this.email);

      Swal.fire({
        title: "Enter OTP",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Verify",
        showLoaderOnConfirm: true,
       
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
         
          });
        }
      });
    }

    
   /* {
      console.log(this.email);
  
      Swal.fire({
        title: "Registeration Successfully",
        text: "That thing is still around?",
       icon: "question"
      });
    }*/

      

    


}
