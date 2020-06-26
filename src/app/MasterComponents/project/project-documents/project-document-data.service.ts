import { Injectable } from '@angular/core';
import { IProjectDocumentDetail, IProjectDocumentAdd } from './iproject-document-types';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable, of } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProjectDocumentDataService {
projectDocumentList:IProjectDocumentDetail[];

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getProjectDocumentList(id:number):Observable<IProjectDocumentDetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectDocumentMapping/list/' + id;
    return this.http.get<IProjectDocumentDetail[]>(url);
  }
  getProjectDocumentById(id:number):Observable<IProjectDocumentDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectDocumentMapping/getById/' + id;
    if(id===0){
      return of(this.initializeProjectDocumentDetail());
    return this.http.get<IProjectDocumentDetail>(url);
    }
  }
  initializeProjectDocumentDetail():IProjectDocumentDetail{
    return {
      projectDocumentMappingId:0,
      projectId:0,
      projectName:'',
      documentTypeId:0,
      documentType:'',
      actualFileName:'',
      storeAsFileName:'',
      notes:''
    }
  }
  //add(iProjectDocumentDetail:IProjectDocumentDetail)
  add(formData:FormData){
    const url:string = this.dataConstantsService.BASEAPIURL +'ProjectDocumentMapping/add';
    return this.http.post<IProjectDocumentDetail>(url,formData);
  }
  edit(iProjectDocumentDetail:IProjectDocumentDetail){
    const url:string = this.dataConstantsService.BASEAPIURL +'ProjectDocumentMapping/edit';
    return this.http.post<IProjectDocumentDetail>(url,iProjectDocumentDetail);
  }
  delete (id:number){
    const url:string =this.dataConstantsService.BASEAPIURL + 'ProjectDocumentMapping/delete/' + id;
    return this.http.post(url,null);
  }

}
