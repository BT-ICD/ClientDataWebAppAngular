import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { DocumentTypeDataService } from './document-type-data.service';
import { IDocumentTypeResolved } from './idocument-type-types';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeResolvedService implements Resolve<IDocumentTypeResolved> {

  constructor(private documentTypeDataService:DocumentTypeDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDocumentTypeResolved | Observable<IDocumentTypeResolved> | Promise<IDocumentTypeResolved> {
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      const message='Document type id was not a number: ${id}';
      return of({documentType:null,error:message});
    }
    return this.documentTypeDataService.getDocumentTypeById(+id)
    .pipe(
      map(data=> ({documentType:data, error:null})),
      catchError(error=>{
        const message=`Retrieval error: ${error.statusText}`;
        return of({documentType:null, error:message});
      })
    );
  }
}
