import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable, of } from 'rxjs';
import { IDocumentTypeDTODetail, IDocumentTypeDTOAdd } from './idocument-type-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getDocumentTypelist():Observable<IDocumentTypeDTODetail[]>{
    const url:string =  this.dataConstantsService.BASEAPIURL + 'DocumentType/list';
    return this.http.get<IDocumentTypeDTODetail[]>(url);
  }
  getDocumentTypeById(id:number):Observable<IDocumentTypeDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL +'DocumentType/getById/' + id;
    if(id===0){
      return of(this.initializeDocumentTypeDTODetail());
    }
    return this.http.get<IDocumentTypeDTODetail>(url);
  }
  initializeDocumentTypeDTODetail():IDocumentTypeDTODetail{
    return {
      documentTypeId:0,
      name:''
    }
  }
  add(iDocumentTypeDTOAdd:IDocumentTypeDTOAdd):Observable<IDocumentTypeDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'DocumentType/add';
    return this.http.post<IDocumentTypeDTODetail>(url,iDocumentTypeDTOAdd);
  }
  edit(iDocumentTypeDTODetail:IDocumentTypeDTODetail):Observable<IDocumentTypeDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'DocumentType/edit';
    return this.http.post<IDocumentTypeDTODetail>(url,iDocumentTypeDTODetail);
  }
  delete(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'DocumentType/delete/' + id;
    return this.http.post(url,null);
  }
}
