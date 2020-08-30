import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProjectDeploymentListComponent } from './project-deployment-list.component';
import { RouterModule } from '@angular/router';
import { ProjectDeploymentListResolvedService } from './project-deployment-list-resolved.service';
import { ProjectDeploymentAddComponent } from './project-deployment-add.component';
import { ProjectDeploymentEditComponent } from './project-deployment-edit.component';
import { ServerListForLOVResolvedService } from 'src/app/MasterComponents/ServerDetail/server-list-for-lovresolved.service';
import { ProjectDeploymentResolvedService } from './project-deployment-resolved.service';



@NgModule({
  declarations: [ProjectDeploymentListComponent, ProjectDeploymentAddComponent, ProjectDeploymentEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(
        [
          
          {
            path:':id/add',
            component:ProjectDeploymentAddComponent,
            runGuardsAndResolvers:'always',
            resolve:{resolveDataServerList:ServerListForLOVResolvedService}
          },
          {
            path:':id/edit',
            component:ProjectDeploymentEditComponent,
            runGuardsAndResolvers:'always',
            resolve:{resolvedData: ProjectDeploymentResolvedService ,  resolveDataServerList:ServerListForLOVResolvedService}
          },
          {
            path:':id',
            component:ProjectDeploymentListComponent,
            runGuardsAndResolvers:'always',
            resolve:{resolvedData:ProjectDeploymentListResolvedService}
          }
        ]
      )
  ]
})
export class ProjectDeploymentModule { }
