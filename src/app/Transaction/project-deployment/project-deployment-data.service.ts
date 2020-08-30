import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable } from 'rxjs';
import { IProjectDeploymentDetail, IProjectDeploymentAdd, IProjectDeploymentEdit } from './project-deployment-types';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeploymentDataService {

  constructor(private http:HttpClient, private dataConstantsService: DataConstantsService) { }
  list(id:number):Observable<IProjectDeploymentDetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'projectdeployment/list/' + id;
    return this.http.get<IProjectDeploymentDetail[]>(url);
  }
  getById(id:number):Observable<IProjectDeploymentDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'projectdeployment/getbyid/' + id;
    return this.http.get<IProjectDeploymentDetail>(url);
  }
  add(formData:FormData):Observable<IProjectDeploymentDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'projectdeployment/add';
    return this.http.post<IProjectDeploymentDetail>(url,formData);
  }
  edit(formData:FormData):Observable<IProjectDeploymentDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'projectdeployment/edit';
    return this.http.post<IProjectDeploymentDetail>(url,formData);
  }
  delete(id:number){
    const url: string = this.dataConstantsService.BASEAPIURL + 'projectdeployment/delete/' + id;
    return this.http.post(url,null);
  }
}
