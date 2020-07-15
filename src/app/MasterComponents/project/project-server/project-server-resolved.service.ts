import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators'

import { IProjectServerDetailResolved } from './iproject-server-type';
import { ProjectServerDataService } from './project-server-data.service';

@Injectable({
  providedIn: 'root'
})

//IProjectServerDetailResolved
export class ProjectServerResolvedService implements Resolve<IProjectServerDetailResolved>{

  constructor(private projectServerDataService: ProjectServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectServerDetailResolved | Observable<IProjectServerDetailResolved> | Promise<IProjectServerDetailResolved> {
   const id= route.paramMap.get('id');
  
   if(isNaN(+id)){
     const message = `Project server detail id was not a number: ${id}`;
     return of({projectServerDetail:null,error:message});
   }
   
   return this.projectServerDataService.getProjectServerById(+id)
    .pipe(
      map(data=>({projectServerDetail:data, error:null}),
        catchError(error=>{
          const message = `Retrieval error: ${error.statusText}`;
          return of({projectServerDetail:null,error:message});
        })
      )
    );
  }
  
}
