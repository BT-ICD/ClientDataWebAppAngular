import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { ServerTypeResolverService } from './server-type-resolver.service';
import { ServerTypeAddComponent } from './server-type-add.component';
import { ServerTypeEditComponent } from './server-type-edit.component';
import { ServerTypeDataResolverService } from './server-type-data-resolver.service';
import { ServerTypeListComponent } from './server-type-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ServerTypeListComponent, ServerTypeAddComponent, ServerTypeEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'servertype',
        component:ServerTypeListComponent, 
        runGuardsAndResolvers:'always',
        resolve: {resolvedData:ServerTypeResolverService}
        
      },
      {
        path:'servertype/add',
        component:ServerTypeAddComponent
        
      },
      {
        path:'servertype/:id/edit',
        component:ServerTypeEditComponent,
        resolve:{resolvedData:ServerTypeDataResolverService}
      }
    ])
  ]
  
})
export class ServerTypeModule { }
