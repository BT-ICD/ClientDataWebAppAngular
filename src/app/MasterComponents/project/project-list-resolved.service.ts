import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { IProjectListResolved } from './iproject-detail';
import { ProjectDataService } from './project-data.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectListResolvedService implements Resolve <IProjectListResolved> {

  constructor(private projectDataService:ProjectDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectListResolved | Observable<IProjectListResolved> | Promise<IProjectListResolved> {
    return this.projectDataService.getProjectList()
    .pipe(
      map(data=>({projectList:data, error:null})),
      catchError(error=>{
          const message= `Retrievel error: ${error.statusText} `;
          return of({projectList:null,error:message});
      })
    );
  }
}
