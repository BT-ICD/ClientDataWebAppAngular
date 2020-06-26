import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ServerDataService } from './server-data.service';
import { IServerListResolved } from './iserver-details';

@Injectable({
  providedIn: 'root'
})
export class ServerListResolvedService implements Resolve<IServerListResolved> {

  constructor(private serverDataService: ServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerListResolved | Observable<IServerListResolved> | Promise<IServerListResolved> {
    return this.serverDataService.getServerList()
    .pipe(
      map(data=>({serverList:data, error:null})),
      catchError(error=>{
        const message=`Retrievel error: ${error.statusText}`;
        return of({serverList:null, error:message});
      })
    );
  }
}
