import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrl: './task3.component.css'
})
export class Task3Component {
  registerForm = new FormGroup({

    fname: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lname: new FormControl('',[Validators.required, Validators.minLength(3)]),
    cname: new FormControl('',[Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required,Validators.pattern("[a-zA-Z0-9]+@[a-z]+[.][a-z]+")]),

    msg: new FormControl('',[Validators.required, Validators.minLength(3)]),

    mo_no: new FormControl('',[
    Validators.required,
    Validators.pattern("^[7-9][0-9]{9}$"),
    Validators.maxLength(10),
    Validators.minLength(10),
    ]),

   
  });

  registerSubmited(){
    console.log(this.registerForm.get("fname"));
    }

    get fname(): FormControl{
      return this.registerForm.get("fname") as FormControl;
    }

    get lname(): FormControl{
      return this.registerForm.get("lname") as FormControl;
    }

    get cname(): FormControl{
      return this.registerForm.get("cname") as FormControl;
    }

    get email(): FormControl{
      return this.registerForm.get("email") as FormControl;
    }

    get mo_no(): FormControl{
      return this.registerForm.get("mo_no") as FormControl;
    }

    get msg(): FormControl{
      return this.registerForm.get("msg") as FormControl;
    }

   

    
 

}
