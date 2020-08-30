import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,  RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IProjectDeploymentResolved } from './project-deployment-types';
import { ProjectDeploymentDataService } from './project-deployment-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeploymentResolvedService implements Resolve<IProjectDeploymentResolved> {

  constructor(private projectDeploymentDataService: ProjectDeploymentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectDeploymentResolved | Observable<IProjectDeploymentResolved> | Promise<IProjectDeploymentResolved> {
  const id= route.paramMap.get('id');
  const selectedProjectId=+route.queryParamMap.get('projectId');
  const selectedProjectName=route.queryParamMap.get('projectName');
  if(isNaN(+id))
  {
      const message = 'Project Deployment Id was not a number: ${id}';
      return of({projectDeployment:null,selectedProjectId:null,selectedProjectName:null, error:message });
  }
  return this.projectDeploymentDataService.getById(+id)
  .pipe(
    map(data=>({projectDeployment:data, selectedProjectId:selectedProjectId,selectedProjectName:selectedProjectName, error:null })),
    catchError(error=>{
      const message= `Retrieval error: ${error.statusText}`;
      return of({projectDeployment:null,selectedProjectId:null,selectedProjectName:null, error:message});
    })
  );
  }
}
