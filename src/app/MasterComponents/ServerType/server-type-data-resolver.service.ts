import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { ServerTypeDataService } from './server-type-data.service';
import { IServerTypeDTODetail, IServerTypeDTODetailResolved } from './iserver-type';

@Injectable({
  providedIn: 'root'
})
export class ServerTypeDataResolverService implements Resolve<IServerTypeDTODetailResolved>{

  constructor(private serverTypeDataService:ServerTypeDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IServerTypeDTODetailResolved | Observable<IServerTypeDTODetailResolved> | Promise<IServerTypeDTODetailResolved> {
   const id=route.paramMap.get('id');
   if(isNaN(+id)){
    const message =`Server type id was not a number: ${id}`;
    console.log(message);
    return of({serverTypeDTO:null, error:message});
   }
    return this.serverTypeDataService.getServerTypeById(+id)
    .pipe(
      map(data=>({serverTypeDTO:data})),
      catchError(error=>{
        const message=`Retrieval error: ${error.statusText}`;
        return of({serverTypeDTO:null, error:message});
      })
    );
  }
}
