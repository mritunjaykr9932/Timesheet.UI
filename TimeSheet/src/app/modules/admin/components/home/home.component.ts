import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Timesheet } from 'src/app/models/timesheet';
import { TimeSheetsService } from 'src/app/services/timeSheet.service';
import { MatPaginator } from '@angular/material/paginator';
import { OrderPipe } from 'ngx-order-pipe';
import { Pipe } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   
})
export class HomeComponent implements OnInit {
  timesheets:Timesheet[]=[];
  
 
  searchText:any;
  projectName:any;
  p:number = 1;


  timesheet:Timesheet={
    id:0,
    projectName:'',
    monday:1 ,
    tuesday: 1,
    wednesday:1 ,
    thursday: 1,
    friday:1,
    totalHours:0,
    description:'',
}

  constructor(private timeSheetsService:TimeSheetsService ,  private routes : Router, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getAllTimeSheets();
    
  }
  getAllTimeSheets()
  {
    this.timeSheetsService.getAllTimeSheets()
    .subscribe(
      response =>
      {
       // console.log(response);
        this.timesheets=response;
        //console.log(this.houseKeepings);
      
      }
    ); 
  }

   onSubmit()
  {
    if(this.timesheet.id=== 0)
    {
      
        this.timeSheetsService.addTimeSheet(this.timesheet)
    .subscribe(
      response => {
        this.getAllTimeSheets();
         this.timesheet={
            id:0,
            projectName:'',
            monday: 0,
            tuesday: 0,
            wednesday:0 ,
            thursday:0 ,
            friday:0,
            totalHours:0,
            description:'',
        }
        
        console.log("hello");
        //  this.routes.navigate(['/Dashboard'] );
      }
    );
    }else{
     this.updateTimeSheet(this.timesheet);
    }
    
  }
  deleteTimeSheet(id:number)
  {
    this.timeSheetsService.deleteTimeSheet(id)
    .subscribe(
      response => {
        this.getAllTimeSheets();
      }
    )
  }
  

  populateForm(timesheet:Timesheet)
  {
    this.timesheet=timesheet;
  }
  updateTimeSheet(timeSheet:Timesheet)
  {
    this.timeSheetsService.updateTimeSheet(timeSheet)
    .subscribe(
      response => {
        this.getAllTimeSheets();
          //this.routes.navigate(['/timesheet'] );
      }
    )
  }

  Search()
  {
    if(this.projectName == ""){
      this.ngOnInit();
    }else{
      this.timesheets = this.timesheets.filter(res => {
        return res.projectName.toLocaleLowerCase().match(this.projectName.toLocaleLowerCase());
      })
    }
  }

  key:string = 'p-name';
  reverse:boolean = false;
  sort(key: string)
  {
    this.key= key;
    this.reverse = !this.reverse;
  }

}
