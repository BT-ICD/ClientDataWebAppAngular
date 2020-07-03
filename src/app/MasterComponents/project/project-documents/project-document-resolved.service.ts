import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { IProjectDocumentDetailResolved } from './iproject-document-types';
import { ProjectDocumentDataService } from './project-document-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDocumentResolvedService implements Resolve<IProjectDocumentDetailResolved> {

  constructor(private projectDocumentDataService:ProjectDocumentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectDocumentDetailResolved | Observable<IProjectDocumentDetailResolved> | Promise<IProjectDocumentDetailResolved> {
    const id=route.paramMap.get('id');
    if(isNaN(+id)){
      const message = `Project Document Id was not a number: ${id}`;
      return of({projectDocumentDetail:null,error:message});
    }
    return this.projectDocumentDataService.getProjectDocumentById(+id)
    .pipe(
      map(data=>({projectDocumentDetail:data, error:null})),
      catchError(error=>{
        const message =`Retrieval error: ${error.statusText}`;
        return of({projectDocumentDetail:null, error:message});
      })
    );
  }
}
