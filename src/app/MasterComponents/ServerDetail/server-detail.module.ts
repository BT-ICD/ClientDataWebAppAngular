import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServerAddComponent } from './server-add.component';
import { ServerEditComponent } from './server-edit.component';
import { ServerByIdResolvedService } from './server-by-id-resolved.service';
import { ServerTypeResolverService } from '../ServerType/server-type-resolver.service';
import { ServerListComponent } from './server-list.component';
import { ServerListResolvedService } from './server-list-resolved.service';
import { AuthGuard } from 'src/app/user-login/auth-guard.guard';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ServerListComponent, ServerAddComponent, ServerEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'serverlist', 
        component:ServerListComponent,
        runGuardsAndResolvers:'always',
        resolve:{resolvedData:ServerListResolvedService},
        canActivate:[AuthGuard]
      },
      {
        path:'server/add',
        component:ServerAddComponent,
        resolve:{resolveDataServerTypeList:ServerTypeResolverService},
        canActivate:[AuthGuard]
      },
      {
        path:'server/:id/edit',
        component:ServerEditComponent,
        resolve:{resolvedData:ServerByIdResolvedService,resolveDataServerTypeList:ServerTypeResolverService},
        canActivate:[AuthGuard]
      }
    ])
  ]
})
export class ServerDetailModule { }
