import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DateUtilService } from 'src/app/shared/Utility/date-util.service';
import { TeamMemberDataService } from '../team-member-data.service';
import { ITeamMemberDTO, ITeamMemberResolve } from '../team-member-types';

@Component({
  selector: 'app-team-member-edit',
  templateUrl: './team-member-edit.component.html',
  styleUrls: ['./team-member-edit.component.css']
})
export class TeamMemberEditComponent implements OnInit, OnDestroy {
  teamMemberResolve: ITeamMemberResolve;
  teamMember: ITeamMemberDTO;
  errorMessage: string;
  teamMemberForm: FormGroup;
  dojFormatedString: Date;

  teamMemberEditSubscription: Subscription;
  resolverSubscription: Subscription;
  
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private dateUtilService: DateUtilService, private teamMemberDataService: TeamMemberDataService) { }

  ngOnInit(): void {
    this.resolverSubscription = this.route.data.subscribe((data) => {
      this.teamMemberResolve = data['resolvedData'];
      this.errorMessage = this.teamMemberResolve.error;
      this.onTeamMemberRetrieved(this.teamMemberResolve.teamMember);
    });
    this.initializeForm();
  }
  initializeForm(): void {
    let dojValue = this.dateUtilService.dateToString(this.teamMember.doj);
    this.teamMemberForm = this.fb.group({
      teamMemberId: new FormControl(this.teamMember.teamMemberId, Validators.required),
      name: new FormControl(this.teamMember.name, Validators.required),
      email: new FormControl(this.teamMember.email, Validators.required),
      mobile: new FormControl(this.teamMember.mobile, Validators.required),
      alternateContact: new FormControl(this.teamMember.alternateContact),
      doj: new FormControl({ value: new Date(dojValue), disabled: false }, Validators.required),
      notes: new FormControl(this.teamMember.notes)
    });
  }
  onTeamMemberRetrieved(data: ITeamMemberDTO) {
    this.teamMember = data;
  }
  onSubmit() {
    // console.log(this.teamMemberForm.valid);
    // console.log('Form Values: ', this.teamMemberForm.value);

    if (this.teamMemberForm.valid) {
      this.teamMember = Object.assign(this.teamMemberForm.value);
      //Todo need to learn on date when submitting why need to add +1
      this.teamMember.doj = new Date(this.teamMember.doj.getFullYear(), this.teamMember.doj.getMonth(), this.teamMember.doj.getDate() + 1);
      this.teamMemberEditSubscription = this.teamMemberDataService.edit(this.teamMember).subscribe((data) => {
        this.router.navigate(['/team']);
      })
    }
  }
  ngOnDestroy(): void {
    this.resolverSubscription?.unsubscribe();
    this.teamMemberEditSubscription?.unsubscribe();
  }

}
// Learning Reference to bind date with reactive form
//https://github.com/primefaces/primeng/issues/8225