import { Component, OnInit } from '@angular/core';
import { IDocumentTypeDTODetail, IDocumentTypeDTOAdd } from './idocument-type-types';
import { Router } from '@angular/router';
import { DocumentTypeDataService } from './document-type-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.css']
})
export class DocumentTypeAddComponent implements OnInit {
documentType:IDocumentTypeDTODetail;

  constructor( private router:Router, private documentTypeDataService:DocumentTypeDataService) { }

  ngOnInit(): void {
    this.documentTypeDataService.getDocumentTypeById(0).subscribe(data=>{this.documentType=data});
   
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      let data:IDocumentTypeDTOAdd ={
        name:this.documentType.name
      }
      this.documentTypeDataService.add(data).subscribe(data=>{
        this.router.navigate(['documenttypelist']);
      });
    }
  }

}
