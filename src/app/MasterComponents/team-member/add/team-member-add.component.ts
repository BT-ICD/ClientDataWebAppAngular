import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DateUtilService } from 'src/app/shared/Utility/date-util.service';
import { TeamMemberDataService } from '../team-member-data.service';
import { ITeamMemberDTOAdd } from '../team-member-types';

@Component({
  selector: 'app-team-member-add',
  templateUrl: './team-member-add.component.html',
  styleUrls: ['./team-member-add.component.css']
})
export class TeamMemberAddComponent implements OnInit , OnDestroy{
teamMember:ITeamMemberDTOAdd;
errorMessage:string;
teamMemberForm:FormGroup;

teamMemberSubmitSubscription:Subscription;

  constructor(private router:Router, private teamMemberDataService: TeamMemberDataService, private fb:FormBuilder, private dateUtilService:DateUtilService) { }

  ngOnInit(): void {
    this.teamMember = this.teamMemberDataService.initializeTeamMember();
    this.initializeForm();
  }
  initializeForm():void{
    let dojValue = this.dateUtilService.getCurrentDate();
    this.teamMemberForm = this.fb.group({
      name:new FormControl(this.teamMember.name, Validators.required),
      email:new FormControl(this.teamMember.email, Validators.required),
      mobile:new FormControl(this.teamMember.mobile, Validators.required),
      alternateContact:new FormControl(this.teamMember.alternateContact),
      doj: new FormControl({ value: null, disabled: false }, Validators.required),
      notes:new FormControl(this.teamMember.notes)
    })
  }
  onSubmit(){
    // console.log(this.teamMemberForm.valid);
    // console.log('Form Values: ', this.teamMemberForm.value);
    if(this.teamMemberForm.valid){
      this.teamMember = Object.assign(this.teamMemberForm.value);
      this.teamMember.doj = new Date(this.teamMember.doj.getFullYear(), this.teamMember.doj.getMonth(), this.teamMember.doj.getDate()+1);
      this.teamMemberSubmitSubscription= this.teamMemberDataService.add(this.teamMember).subscribe((data)=>{
        this.router.navigate(['/team']);
      })
    }
  }
  ngOnDestroy(): void {
    this.teamMemberSubmitSubscription?.unsubscribe();
  }

}
