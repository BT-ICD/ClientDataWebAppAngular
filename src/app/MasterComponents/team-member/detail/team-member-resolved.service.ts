import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { TeamMemberDataService } from '../team-member-data.service';
import { ITeamMemberResolve } from '../team-member-types';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberResolvedService implements Resolve<ITeamMemberResolve> {

  constructor(private teamMemberDataService: TeamMemberDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ITeamMemberResolve | Observable<ITeamMemberResolve> | Promise<ITeamMemberResolve> {
    let id = +route.paramMap.get('id');
    return this.teamMemberDataService.getTeamMemberById(id)
      .pipe(
        map((data)=>({teamMember:data, error:null})),
        catchError((error)=>
        {
          const message:string = `Retrievel error: ${error.statusText}`;
          return of({teamMember:null, errro:message});
        })
      );
  }
}
