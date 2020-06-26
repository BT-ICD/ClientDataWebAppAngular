import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectAddComponent } from './project-add.component';
import { ProjectEditComponent } from './project-edit.component';
import { RouterModule } from '@angular/router';
import { ProjectListResolvedService } from './project-list-resolved.service';
import { AuthGuard } from 'src/app/user-login/auth-guard.guard';
import { ProjectResolvedService } from './project-resolved.service';



@NgModule({
  declarations: [ProjectListComponent, ProjectAddComponent, ProjectEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'projectlist', 
        component:ProjectListComponent,
        runGuardsAndResolvers:'always',
        resolve:{resolvedData:ProjectListResolvedService}
        //canActivate:[AuthGuard]
      },
      {
        path:'project/add',
        component:ProjectAddComponent
      },
      {
        path:'project/:id/edit',
        component:ProjectEditComponent,
        resolve:{resolvedData:ProjectResolvedService}
      }

    ])
  ]
})
export class ProjectModule { }
