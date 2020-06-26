import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Observable, of} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import { IServerDetailResolved } from './iserver-details';
import { ServerDataService } from './server-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerByIdResolvedService implements Resolve<IServerDetailResolved> {

  constructor(private serverDataService:ServerDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerDetailResolved | Observable<IServerDetailResolved> | Promise<IServerDetailResolved> {
    const id= route.paramMap.get('id');
    //const id=1;
    if(isNaN(+id)){
      const message=`Server id was not a number: ${id}`;
      console.log(message);
      return of({serverDetail:null, error:message});
    }
    return this.serverDataService.getServerById(+id)
    .pipe(
      map(data=>({serverDetail:data, error:null})),
      catchError(error=>{
        const message=`Retrieval error: ${error.statusTest}`;
        return of({serverDetail:null, error:message});
        })
    );
  }
}
