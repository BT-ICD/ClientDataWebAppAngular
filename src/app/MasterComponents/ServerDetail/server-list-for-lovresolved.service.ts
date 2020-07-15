import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { IServerDTOForLOVListResolved } from './iserver-details';
import { ServerDataService } from './server-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerListForLOVResolvedService implements Resolve<IServerDTOForLOVListResolved> {

  constructor(private serverDataService:ServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerDTOForLOVListResolved | Observable<IServerDTOForLOVListResolved> | Promise<IServerDTOForLOVListResolved> {
    return this.serverDataService.getServerListForLOV()
      .pipe(
        map((data)=>({serverListForLOV:data,error:null})),
        catchError(error=>{
          const message=`Retrievel error: ${error.statusText}`;
          return of({serverListForLOV:null, error:message});
        })
      );
  }
}
