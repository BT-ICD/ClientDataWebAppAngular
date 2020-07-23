import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DocumentTypeListComponent } from './document-type-list.component';
import { DocumentTypeListResolvedService } from './document-type-list-resolved.service';

import { DocumentTypeEditComponent } from './document-type-edit.component';
import { DocumentTypeAddComponent } from './document-type-add.component';
import { DocumentTypeResolvedService } from './document-type-resolved.service';


@NgModule({
  declarations: [ DocumentTypeListComponent, DocumentTypeEditComponent, DocumentTypeAddComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'documenttypelist',
        component:DocumentTypeListComponent,
        runGuardsAndResolvers:'always',
        resolve:{resolvedData:DocumentTypeListResolvedService}
      },
      {
        path:'documenttype/add',
        component:DocumentTypeAddComponent
      },
      {
        path:'documenttype/:id/edit',
        component:DocumentTypeEditComponent,
        resolve:{resolvedData:DocumentTypeResolvedService}
      }
    ])
  ]
})
export class DocumentTypeModule { }
