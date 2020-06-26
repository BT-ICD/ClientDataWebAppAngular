import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { IProjectDetailResolved } from './iproject-detail';
import { ProjectDataService } from './project-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolvedService implements Resolve<IProjectDetailResolved>{

  constructor(private projectDataService:ProjectDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectDetailResolved | Observable<IProjectDetailResolved> | Promise<IProjectDetailResolved> {
    const id= route.paramMap.get('id');
    if(isNaN(+id)){
      const message=`Project id was not a number: ${id}`;
      return of({projectDetail:null,error:message});
    }
    return this.projectDataService.getProjectById(+id)
    .pipe(
      map(data=> ({projectDetail:data, error:null})),
      catchError(error=>{
        const message =`Retrieval error: ${error.statusText}`;
        return of({projectDetail:null, error:message});
      })
    );
  }
}
