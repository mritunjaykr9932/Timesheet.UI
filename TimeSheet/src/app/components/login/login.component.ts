import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Router,ActivatedRoute,RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth:AuthService,private router:Router,route:ActivatedRoute) { }

  ngOnInit() {
    if(this.loginAuth.isLoggedIn())
    {
      this.router.navigate(['admin']);
    }
  }

  loginForm = new FormGroup({
    email:new FormControl("",[Validators.email,Validators.required]),
    pwd:new FormControl("",[Validators.required]),
  });

  isUserValid : boolean=false;

  loginSubmited()
  {
    this.loginAuth.loginUser([this.loginForm.value.email,this.loginForm.value.pwd]).subscribe(res => {
        if(res=='Failure'){
          this.isUserValid=false;
          alert('Dhang Se daal Password ya Email');
        }else{
          this.isUserValid=true;
          this.loginAuth.setToken(res);
          this.router.navigateByUrl('admin/home');
        }
    });
  }

  

  get Email():FormControl{
    return this.loginForm.get("email") as FormControl
  }

   get PWD():FormControl{
    return this.loginForm.get("pwd") as FormControl
  }

}
