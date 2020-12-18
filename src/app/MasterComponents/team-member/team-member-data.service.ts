import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { ITeamMemberDTO, ITeamMemberDTOAdd, ITeamMemberDTOList } from './team-member-types';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getTeamMemberList():Observable<ITeamMemberDTOList[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'TeamMember/list';
    return this.http.get<ITeamMemberDTOList[]>(url);
  }
  getTeamMemberById(id:number):Observable<ITeamMemberDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL +'TeamMember/GetById/' + id;
    return this.http.get<ITeamMemberDTO>(url);
  }
  add(teamMemberDTOAdd:ITeamMemberDTOAdd):Observable<ITeamMemberDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL +'TeamMember/add';
    return this.http.post<ITeamMemberDTO>(url,teamMemberDTOAdd);
  }
  edit(teamMemberDTO:ITeamMemberDTO):Observable<ITeamMemberDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'TeamMember/edit';
    return this.http.post<ITeamMemberDTO>(url,teamMemberDTO);
  }
  delete(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL +'TeamMember/delete/' + id;
    return this.http.post(url,null);
  }
  initializeTeamMember():ITeamMemberDTO{
    return {
      teamMemberId:0,
      name:'',
      email:'',
      mobile:'',
      alternateContact:'',
      doj:new Date(),
      notes:''
    };
  }
}
