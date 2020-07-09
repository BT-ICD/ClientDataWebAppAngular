import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable,of} from 'rxjs'
import {catchError,map} from 'rxjs/operators';

import { IProjectServerListResolved } from './iproject-server-type';
import { ProjectServerDataService } from './project-server-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectServerListResolvedService implements Resolve<IProjectServerListResolved>{

  constructor(private projectServerDataService:ProjectServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectServerListResolved | Observable<IProjectServerListResolved> | Promise<IProjectServerListResolved> {
    const id = route.paramMap.get('id');
    const projectName = route.queryParamMap.get('projectName');
    if(isNaN(+id)){
      const message=`Invalid project id`;
      return of({projectServerList:null,selectedProjectId:null,selectedProjectName:null,error:message});
    }
    if(projectName==null||projectName==''){
      const message=`Invalid project name`;
      return of({projectServerList:null,selectedProjectId:null,selectedProjectName:null,error:message});
    }
    return this.projectServerDataService.getProjectServerList(+id)
      .pipe(
        map(data=>({projectServerList:data,selectedProjectId:+id,selectedProjectName:projectName,error:null})),
        catchError(error=>{
          const message=`Retrievel error:${error.statusText}`;
          return of({projectServerList:null,selectedProjectId:null,selectedProjectName:null, error:message});
        })
      );
  }
}
