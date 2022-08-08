import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { __values } from 'tslib';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // user: BehaviorSubject<any> ;
  //  user:Array<string>;
   
  // user:BehaviorSubject<User>;
  user:any|null;
  
  @Output() toggleSidebarForMe:EventEmitter<any> = new EventEmitter();

  constructor(private authService:AuthService,private router:Router) {
    // this.authService.registerUsers().subscribe((data =>{
    //   console.log("data",data);
      
    // }))
    
        
  // this.user= this.authService.currentUser.value.firstname.subscribe((user:any) =>
  //     {
  //       console.log(user);
  //     });
      

    
   }
   jwtHelperService = new JwtHelperService();

  ngOnInit() {
   this. user =JSON.parse(localStorage.getItem('UserData' ) || '{}');
   console.log(this.user);
  }
  toggleSidebar()
  {
      this.toggleSidebarForMe.emit();
  }

  logout()
  {
    console.log("done");
      this.authService.removeToken();
      this.router.navigateByUrl('/Login');
  }


 
 

  

}
