import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   //user: BehaviorSubject<any> = new BehaviorSubject(null);
  // user:BehaviorSubject<User>;
  user:any;
  
  @Output() toggleSidebarForMe:EventEmitter<any> = new EventEmitter();

  constructor(private authService:AuthService,private router:Router) {
    // this.authService.registerUsers().subscribe((data =>{
    //   console.log("data",data);
      
    // }))
    this.user = this.authService.currentUser.value;
    console.log(this.user);
   }
   jwtHelperService = new JwtHelperService();

  ngOnInit() {
    
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
