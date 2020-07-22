import { Component, OnInit } from '@angular/core';
import { IDocumentTypeDTODetail } from './idocument-type-types';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeDataService } from './document-type-data.service';
import { resolve } from 'dns';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {
documentType:IDocumentTypeDTODetail;
errorMessage:string;

  constructor(private route:ActivatedRoute, private router:Router, private documentTypeDataService:DocumentTypeDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
loadData(){
   this.route.data.subscribe((data)=>{
    const resolvedData =data['resolvedData'];
    this.onDocumentTypeRetrieved(resolvedData.documentType);
    this.errorMessage= resolvedData.error;
   });
}
onDocumentTypeRetrieved(data:IDocumentTypeDTODetail){
  this.documentType=data;
}
saveButtonClick(f:NgForm){
  if(f.valid){
    this.documentTypeDataService.edit(this.documentType).subscribe(data=>{
      this.router.navigate(['/documenttypelist']);
    });
  }
}
}
