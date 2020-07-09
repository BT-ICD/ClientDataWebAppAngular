import { Injectable } from '@angular/core';
import { IProjectServerType } from './iproject-server-type';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServerDataService {
projectServerList:IProjectServerType[];

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getProjectServerList(id:number):Observable<IProjectServerType[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectServerMapping/List/'+id;
    return this.http.get<IProjectServerType[]>(url);
  }
  getProjectServerById(id:number):Observable<IProjectServerType>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectServerMapping/GetByID/' + id;
    return this.http.get<IProjectServerType>(url);
  }
  initializedProjectServerDetail():IProjectServerType{
    return {
      projectServerMappingId:0,
      projectId:0,
      projectName:'',
      serverId:0,
      serverName:'',
      actualServerType:'',
      deployedServerTypeId:0,
      deployedAsServerType:'',
      urlToAccess:'',
      deployedLocation:'',
      appLogLocation:'',
      databaseServerName:'',
      dbServerID:0,
      dbName:'',
      notes:''
    }
  }
  delete(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectServerMapping/delete/' + id;
    return this.http.post(url,null);
  }
  //To implement Add/Edit method
}
