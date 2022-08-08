import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  repeatPass:string = 'none';

  displayMsg:string='';
  isAccountCreated:boolean=false;


  constructor(private authService:AuthService,private router : ActivatedRoute , private routes : Router ) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    firstname : new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
    lastname : new FormControl("",[Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
    email : new FormControl("",[Validators.required,Validators.email]),
    mobile : new FormControl("",[Validators.required,Validators.pattern("[0-9]*"), Validators.minLength(10),Validators.maxLength(10),]),
    gender : new FormControl("",[Validators.required]),
    pwd : new FormControl(""),
    rpwd : new FormControl(""),
  });

  registerSubmited()
  {
    if(this.PWD.value==this.RPWD.value){
     
      this.repeatPass = 'none'; 
     
      //  console.log(this.registerForm.value);
        delete this.registerForm.value.rpwd;
        this.authService.registerUser(this.registerForm.value).subscribe((data)=>{
        console.log(data);
      })

      this.authService.registerUser([
        
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.email,
        this.registerForm.value.mobile,
        this.registerForm.value.gender,
        this.registerForm.value.pwd,
         
      ]).subscribe(res => {
      if(res == 'Already Exist'){
        console.log("already");
        console.log(this.registerForm.value);
        this.displayMsg='Account Already Exist.try another Email.';
        this.isAccountCreated=false;
        
       }else if(res == 'Success'){
        console.log("success");
        this.displayMsg = 'Account Created Succesfull!';
        this.isAccountCreated = true;
        this.routes.navigate(['/Login'] );
        
       }
       else{
        console.log("something");
        this.displayMsg='Something went wrong ';
        this.isAccountCreated = false;

       }
      });

    }else{
      this.repeatPass='inline';  
    }
  }
  get FirstName():FormControl{
    return this.registerForm.get("firstname") as FormControl
  }

   get LastName():FormControl{
    return this.registerForm.get("lastname") as FormControl
  }

   get Email():FormControl{
    return this.registerForm.get("email") as FormControl
  }
   get Mobile():FormControl{
    return this.registerForm.get("mobile") as FormControl
  }
   get Gender():FormControl{
    return this.registerForm.get("gender") as FormControl
  }
   get PWD():FormControl{
    return this.registerForm.get("pwd") as FormControl
  }
  get RPWD():FormControl{
    return this.registerForm.get("rpwd") as FormControl
  }

}
