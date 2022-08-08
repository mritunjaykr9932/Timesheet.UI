import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { TimeSheetEntry } from '../../../models/time-sheet-entry.model';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Timesheet } from 'src/app/models/timesheet';
import { TimeSheetsService } from 'src/app/services/timeSheet.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

export interface PeriodicElement {
  // name: string;
  // position: string;
  // weight: number;
  // symbol: string;
}

// const ELEMENT_DATA: Timesheet[] = [
//   {
//     id: 0,
//     projectName: '',
//     monday: 5,
//     tuesday: 5,
//     wednesday: 5,
//     thursday: 5,
//     friday: 5,
//     totalHours: 5,
//     description: '',
//   },
// ];

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  timesheets: Timesheet[] = [];

  timesheet: Timesheet = {
    id: 0,
    projectName: '',
    monday: 1,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    totalHours: 0,
    description: '',
  };

  displayedColumns: string[] = ['projectname', 'monday', 'tuesday','wednesday','thursday','friday','total','description'];
  dataSource = this.timesheet;

  constructor(
    private timeSheetsService: TimeSheetsService,
    private router: ActivatedRoute,
    private routes: Router
  ) {}

  ngOnInit() {
    this.getAllTimeSheets();
    console.log(this.router.snapshot.paramMap.get('id'));
    this.timeSheetsService
    .getCurrentData(this.router.snapshot.paramMap.get('id') || '{}')
      .subscribe((response) => {
        this.timesheet = response;
      });
  }
  getAllTimeSheets() {
    this.timeSheetsService.getAllTimeSheets().subscribe((response) => {
      console.log(response);
      this.timesheets = response;
      console.log(this.timesheets);
    });
  }
  
  onSubmit() {
    console.log('click');
    if (this.timesheet.id === null) {
      this.timeSheetsService
        .addTimeSheet(this.timesheet)
        .subscribe((response) => {
          this.getAllTimeSheets();
          this.timesheet = {
            id:0,
            projectName: '',
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            totalHours: 0,
            description: '',
          };

          console.log('data posted');
            // this.routes.navigate(['/home'] );
        });
    } else {
      console.log('updated');
      this.updateTimeSheet(this.timesheet);
    }
  }
  deleteTimeSheet(id: string) {
    this.timeSheetsService.deleteTimeSheet(0).subscribe((response) => {
      this.getAllTimeSheets();
    });
  }

  populateForm(timesheet: Timesheet) {
    this.timesheet = timesheet;
  }
  updateTimeSheet(timeSheet: Timesheet) {
    this.timeSheetsService.updateTimeSheet(timeSheet).subscribe((response) => {
      this.getAllTimeSheets();
      //  this.routes.navigate(['/Dashboard'] );
    });
  }
  click() {
    console.log('clicked');
  }
}
