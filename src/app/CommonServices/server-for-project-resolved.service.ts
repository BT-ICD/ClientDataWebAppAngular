import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable,of} from 'rxjs'
import {catchError,map} from 'rxjs/operators';
import { IServerForProjectsResolved } from './commontype';
import { ProjectServerDataService } from '../MasterComponents/Project/project-server/project-server-data.service';


@Injectable({
  providedIn: 'root'
})
export class ServerForProjectResolvedService implements Resolve <IServerForProjectsResolved> {

  constructor(private projectServerDataService:ProjectServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerForProjectsResolved | Observable<IServerForProjectsResolved> | Promise<IServerForProjectsResolved> {
    return this.projectServerDataService.getServersForProject(null)
    .pipe(
      map(data=>({serverList:data, error:null})),
      catchError(error=>{
        const message ='Retrievel error ${error.statusText}';
        return of({serverList:null, error:message});
      })
    );
  }
}
