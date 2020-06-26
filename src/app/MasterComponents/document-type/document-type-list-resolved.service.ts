import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map } from 'rxjs/operators';

import { IDocumentTypeListResolved } from './idocument-type-types';
import { DocumentTypeDataService } from './document-type-data.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeListResolvedService implements Resolve <IDocumentTypeListResolved> {

  constructor(private documentTypeDataService:DocumentTypeDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDocumentTypeListResolved | Observable<IDocumentTypeListResolved> | Promise<IDocumentTypeListResolved> {
    return this.documentTypeDataService.getDocumentTypelist()
    .pipe(
      map(data=>({documentTypeList:data, error:null})),
      catchError(error=>{
        const message= `Retrieval error ${error.statusText}`;
        return of({documentTypeList:null, error:message});
      })
    );
  }
}
