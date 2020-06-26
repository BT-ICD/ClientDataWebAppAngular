import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable,of} from 'rxjs' 
import {  catchError, map } from 'rxjs/operators';

import {  IServerTypeDTODetailListResolved } from './iserver-type';
import { ServerTypeDataService } from './server-type-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerTypeResolverService implements Resolve <IServerTypeDTODetailListResolved> {

  constructor(private serverTypeDataService:ServerTypeDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IServerTypeDTODetailListResolved>{
    console.log('Function call - resolve');
return this.serverTypeDataService.getServerTypeList()
.pipe(
  map(data => ({ ServerTypeDTODetailList: data })),
  catchError(error => {
    const message= `Retrieval error: ${error.statusText}`;
    return of({ServerTypeDTODetailList: null, error: message });
  })
);

  }
}
