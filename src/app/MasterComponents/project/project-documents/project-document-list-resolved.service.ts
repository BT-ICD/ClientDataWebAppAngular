import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ProjectDocumentDataService } from './project-document-data.service';
import { IProjectDocumentListResolved } from './iproject-document-types';


@Injectable({
  providedIn: 'root'
})
export class ProjectDocumentListResolvedService implements Resolve <IProjectDocumentListResolved> {

  constructor(private projectDocumentDataService:ProjectDocumentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProjectDocumentListResolved | Observable<IProjectDocumentListResolved> | Promise<IProjectDocumentListResolved> {
    const id= route.paramMap.get('id');
   console.log( 'Project = ' + route.queryParamMap.get('projectName'));
   //To access additional paramenter for project name from query parameter
   const projectName=route.queryParamMap.get('projectName');
    if(isNaN(+id)){
      const message=`Invalid project id`;
      return of({projectDocumentList:null,selectedProjectId:null,selectedProjectName:null,error:message})
    }
   if(projectName==null || projectName==''){
    const message=`Invalid project name.`;
      return of({projectDocumentList:null,selectedProjectId:+id,selectedProjectName:null,error:message})
   }
    return this.projectDocumentDataService.getProjectDocumentList(+id)
    .pipe(
      map(data=>({projectDocumentList:data,selectedProjectId:+id,selectedProjectName:projectName,error:null})),
      catchError(error=>{
        const message=`Retrievel error: ${error.statusText}`;
        return of({projectDocumentList:null,selectedProjectId:+id,selectedProjectName:null,error:message});
      })
    );
  }
}
