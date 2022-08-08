import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timesheet } from '../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetsService {
   baseUrl='https://localhost:7233/api/TimeSheet'

constructor(private http: HttpClient) { }

 getAllTimeSheets():Observable<Timesheet[]>
  {
   return this.http.get<Timesheet[]>(this.baseUrl);
  }

 addTimeSheet(timeSheet:Timesheet):Observable<Timesheet>{
  // timeSheet.id=00000000-0000-0000-0000-000000000000;
   return this.http.post<Timesheet>(this.baseUrl,timeSheet);
   
  }

deleteTimeSheet(id:number):Observable<Timesheet>
  {
     return this.http.delete<Timesheet>(this.baseUrl + '/' + id);
  }
  getCurrentData(id:string):Observable<Timesheet>{
    return this.http.get<Timesheet>(this.baseUrl + '/' + id)
  }
    updateTimeSheet(timeSheet:Timesheet):Observable<Timesheet>
  {
    return this.http.put<Timesheet>(this.baseUrl + '/' +timeSheet.id,timeSheet)
  }
  

}
