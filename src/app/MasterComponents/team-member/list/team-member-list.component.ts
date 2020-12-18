import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamMemberDataService } from '../team-member-data.service';
import { ITeamMemberDTOList, ITeamMemberListResolve } from '../team-member-types';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css']
})
export class TeamMemberListComponent implements OnInit, OnDestroy {
  teamMemberListResolve: ITeamMemberListResolve;
  teamMemberList:ITeamMemberDTOList[];
  selectedTeamMember:ITeamMemberDTOList;
  errorMessage:string;
  cols:any[];

  teamMemberDeleteSubscription:Subscription;
  constructor(private route:ActivatedRoute, private router:Router, private teamMemberDataService:TeamMemberDataService) { }
  

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.teamMemberListResolve = data['resolvedData'];
      this.onTeamMemberListRetrieved(this.teamMemberListResolve.teamMembers);
      this.errorMessage = this.teamMemberListResolve.error;
    });

    //Initialize columns for p-table
    this.cols = [
      {field:'teamMemberId',header:'Id'},
      {field:'name',header:'Name'},
      {field:'email',header:'Email'},
      {field:'mobile',header:'Mobile'}
    ]
  }
  onTeamMemberListRetrieved(data:ITeamMemberDTOList[]){
    this.teamMemberList = data;
  }
  editTeamMember(){
    if(this.selectedTeamMember==null){
      alert('Select team member to edit details');
      return;
    }
    this.router.navigate(['team',this.selectedTeamMember.teamMemberId,'edit']);
  }
  deleteTeamMember(){
    if(this.selectedTeamMember==null){
      alert('Select team member to delete details');
      return;
    }
    if(confirm('You are about to delete a record. Are you sure?')){
      this.teamMemberDeleteSubscription= this.teamMemberDataService.delete(this.selectedTeamMember.teamMemberId).subscribe((data)=>{
        this.router.navigate(['/team']);
      })  
    }
  }
  ngOnDestroy(): void {
    this.teamMemberDeleteSubscription?.unsubscribe();
  }
}
