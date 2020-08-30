import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { ProjectDeploymentDataService } from './project-deployment-data.service';
import { IProjectDeploymentListResolved } from './project-deployment-types';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeploymentListResolvedService implements Resolve <IProjectDeploymentListResolved>{

  constructor(private projectDeploymentDataService: ProjectDeploymentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectDeploymentListResolved | Observable<IProjectDeploymentListResolved> | Promise<IProjectDeploymentListResolved> {
    const id= route.paramMap.get('id');
    const projectName = route.queryParamMap.get('projectName');
    if(isNaN(+id)){
      const message =`Invalid project id `;
      return of({projectDeploymentList:null, selectedProjectId:null,selectedProjectName:null,error:message});
    }
    if(projectName==null || projectName==''){
      const message =`Invalid project name `;
      return of({projectDeploymentList:null, selectedProjectId:null,selectedProjectName:null,error:message});
    }
    return this.projectDeploymentDataService.list(+id)
      .pipe(
        map(data=> ({projectDeploymentList:data,selectedProjectId:+id, selectedProjectName:projectName, error:null})),
        catchError(error=>{
            const message=`Retrievel error: ${error.statusText}`;
            return of({projectDeploymentList:null,selectedProjectId:null,selectedProjectName:null,  error:message})
        })
      );
  }

}
