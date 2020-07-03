import { Component, OnInit } from '@angular/core';
import { IProjectDocumentDetail } from './iproject-document-types';
import { IDocumentTypeDTODetail } from '../../document-type/idocument-type-types';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { ProjectDocumentDataService } from './project-document-data.service';

@Component({
  selector: 'app-project-document-edit',
  templateUrl: './project-document-edit.component.html',
  styleUrls: ['./project-document-edit.component.css']
})
export class ProjectDocumentEditComponent implements OnInit {
  projectDocument:IProjectDocumentDetail;
  documentTypeList:IDocumentTypeDTODetail[];
  downloadUrl:string;
  errorMessage:string;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectedProjectName:string='Selected Project Name Need to correct';
  constructor(private route: ActivatedRoute, private router:Router, private dataConstantsService:DataConstantsService, private projectDocumentDataService: ProjectDocumentDataService) { }

  ngOnInit(): void {
    this.selectedProjectName =this.route.snapshot.queryParamMap.get('projectName');
    this.loadData();
    console.log(this.projectDocument);
  }
  loadData(){
    this.route.data.subscribe(data=>{
      const resolvedData = data['resolvedData'];
      const documentTypeResolvedData = data['resolvedDocumentTypeList'];
      this.onProjectDocumentRetrieved(resolvedData.projectDocumentDetail);
      this.onDocumentTypeListRetrieved(documentTypeResolvedData.documentTypeList);
      if(this.errorMessage) {
        this.errorMessage+=resolvedData.error;
      }
      else{
        this.errorMessage=documentTypeResolvedData.error;
      } 
    });
  }
  onProjectDocumentRetrieved(data:IProjectDocumentDetail){
    this.projectDocument= data;
    this.downloadUrl=this.dataConstantsService.BASEAPIURL +'ProjectDocumentMapping/download/' + this.projectDocument.projectDocumentMappingId; 
  }
  onDocumentTypeListRetrieved(data:IDocumentTypeDTODetail[]){
    this.documentTypeList= data;
  }
  fileProgress(fileInput:any){
    this.fileData = <File>fileInput.target.files[0];
  }
  saveButtonClick(f:NgForm){
    //validations - need to update with formatted content next to input control
    let errMessage:string='';
    if(this.projectDocument.documentTypeId===0){
      errMessage='Document type is required';
    }
    if(this.projectDocument.notes.trim()===''){
      errMessage+= '\nNotes is required' 
    }
    if(errMessage!=''){
      alert(errMessage);
      return;
    }
    const formData = new FormData();
    formData.append('projectDocumentMappingId',this.projectDocument.projectDocumentMappingId+'');
    formData.append('projectId',this.projectDocument.projectId+'');
    formData.append('documentTypeId',this.projectDocument.documentTypeId+'');
    formData.append('notes',this.projectDocument.notes);
    if(this.fileData!=null){
      formData.append('file',this.fileData);
    }
    console.log(formData);
    this.projectDocumentDataService.edit(formData).subscribe(data=>{
      this.router.navigate(['projectdocumentlist',this.projectDocument.projectId],{
        queryParams: {projectName:this.selectedProjectName}
      })
    });
    
  }
  getDownloadUrl():string{
    return 
  }
}
