import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentListComponent } from './project-document-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectDocumentListResolvedService } from './project-document-list-resolved.service';
import { ProjectDocumentAddComponent } from './project-document-add.component';
import { ProjectDocumentEditComponent } from './project-document-edit.component';
import { DocumentTypeListResolvedService } from '../../document-type/document-type-list-resolved.service';



@NgModule({
  declarations: [ProjectDocumentListComponent, ProjectDocumentAddComponent, ProjectDocumentEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'projectdocumentlist/:id',
        component:ProjectDocumentListComponent,
        runGuardsAndResolvers:'always',
        resolve:{resolvedData:ProjectDocumentListResolvedService}
      },
      {
        path:'projectdocument/:id/add',
        component:ProjectDocumentAddComponent,
        resolve:{resolvedData:DocumentTypeListResolvedService}
      },
      {
        path:'projectdocument/:id/edit',
        component:ProjectDocumentEditComponent,
        resolve:{resolvedData:DocumentTypeListResolvedService}

      }
    ])
  ]
})
export class ProjectDocumentsModule { }
