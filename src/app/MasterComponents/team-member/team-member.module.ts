import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMemberListComponent } from './list/team-member-list.component';
import { RouterModule } from '@angular/router';
import { TeamMemberListResolvedService } from './list/team-member-list-resolved.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamMemberEditComponent } from './detail/team-member-edit.component';
import { TeamMemberResolvedService } from './detail/team-member-resolved.service';
import { TeamMemberAddComponent } from './add/team-member-add.component';



@NgModule({
  declarations: [TeamMemberListComponent, TeamMemberEditComponent, TeamMemberAddComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'team',
        component:TeamMemberListComponent,
        resolve:{resolvedData:TeamMemberListResolvedService},
        runGuardsAndResolvers:'always'
      },
      {
        path:'team/:id/edit',
        component:TeamMemberEditComponent,
        resolve:{resolvedData:TeamMemberResolvedService}
      },
      {
        path:'team/add',
        component:TeamMemberAddComponent
      }
    ])
  ]
})
export class TeamMemberModule { }
