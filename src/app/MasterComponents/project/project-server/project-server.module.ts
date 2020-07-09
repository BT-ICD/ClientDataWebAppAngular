import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {  RouterModule } from '@angular/router';
import { ProjectServerListComponent } from './project-server-list.component';
import { ProjectServerAddComponent } from './project-server-add.component';
import { ProjectServerEditComponent } from './project-server-edit.component';
import { ProjectServerListResolvedService } from './project-server-list-resolved.service';



@NgModule({
  declarations: [ProjectServerListComponent, ProjectServerAddComponent, ProjectServerEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'projectserverlist/:id',
        component:ProjectServerListComponent,
        runGuardsAndResolvers:'always',
        resolve:{resolvedData:ProjectServerListResolvedService}
      },
      {
        path:'projectserver/:id/add',
        component:ProjectServerAddComponent
      },
      {
        path:'projectserver/:id/edit',
        component:ProjectServerEditComponent
      }
  ])
  ]
})
export class ProjectServerModule { }
