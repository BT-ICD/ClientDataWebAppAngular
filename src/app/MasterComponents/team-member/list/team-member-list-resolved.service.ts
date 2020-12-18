import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { TeamMemberDataService } from '../team-member-data.service';

import { ITeamMemberListResolve } from '../team-member-types';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberListResolvedService implements Resolve<ITeamMemberListResolve> {

  constructor(private teamMemberDataService: TeamMemberDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ITeamMemberListResolve | Observable<ITeamMemberListResolve> | Promise<ITeamMemberListResolve> {
    return this.teamMemberDataService.getTeamMemberList()
        .pipe(
          map((data)=>({teamMembers:data, error:null})),
          catchError(error=>{
            const message:string =`Retrievel error ${error.statusText}`;
            return of({teamMembers:null, error:message});
          })
        )
  }
}
