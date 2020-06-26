import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { IProjectDetail } from './iproject-detail';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  
  getProjectList():Observable<IProjectDetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'project/list';
    return this.http.get<IProjectDetail[]>(url);
  }
  getProjectById(id:number):Observable<IProjectDetail>{
    if(id===0){
      return of(this.initializedProjectDetail());
    }
    const url:string  = this.dataConstantsService.BASEAPIURL + 'project/getbyid/' + id;
    return this.http.get<IProjectDetail>(url);
  }
  add(iProjectDetail:IProjectDetail):Observable<IProjectDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + "project/add";
    return this.http.post<IProjectDetail>(url,iProjectDetail);
  }
  edit(iProjectDetail:IProjectDetail):Observable<IProjectDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + "project/edit";
    return this.http.post<IProjectDetail>(url,iProjectDetail); 
  }
  delete(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'project/delete/' + id;
    return this.http.post(url,null);
  }
  initializedProjectDetail():IProjectDetail{
    return {
      projectId:0,
      name:"",
      about:"",
      notes:"",
      sourceCodeLocation:""
    }
  }

}
