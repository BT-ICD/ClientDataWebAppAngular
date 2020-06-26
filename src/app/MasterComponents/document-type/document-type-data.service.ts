import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable } from 'rxjs';
import { IDocumentTypeDTODetail } from './idocument-type-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getDocumentTypelist():Observable<IDocumentTypeDTODetail[]>{
    const url:string =  this.dataConstantsService.BASEAPIURL + 'DocumentType/list';
    return this.http.get<IDocumentTypeDTODetail[]>(url);
  }
}
