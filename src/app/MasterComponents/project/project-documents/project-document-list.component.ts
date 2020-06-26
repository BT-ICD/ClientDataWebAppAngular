import { Component, OnInit } from '@angular/core';
import { IProjectDocumentDetail } from './iproject-document-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDocumentDataService } from './project-document-data.service';
import { resolve } from 'url';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
///Learning Reference - To download file https://stackoverflow.com/questions/50907542/download-a-file-from-asset-folder-when-clicking-on-a-button
@Component({
  selector: 'app-project-document-list',
  templateUrl: './project-document-list.component.html',
  styleUrls: ['./project-document-list.component.css']
})
export class ProjectDocumentListComponent implements OnInit {
selectedRow:number;
errorMessage:string='';
page=0;
pageSize=10;
collectionSize=0;
showToast:boolean=false;
selectedProjectName:string='';
selectedProjectId:number;
  private _projectDocumentList: IProjectDocumentDetail[];
  public get projectDocumentList(): IProjectDocumentDetail[] {
    //return this._projectDocumentList;
    if(this._projectDocumentList){
      return this._projectDocumentList
        .map((projectDocument,i)=>({id:i+1, ...projectDocument}))
        .slice((this.page-1)*this.pageSize, (this.page-1)*this.pageSize+this.pageSize);
    }
    else
    {
      return this._projectDocumentList;
    }
  }
  public set projectDocumentList(value: IProjectDocumentDetail[]) {
    this._projectDocumentList = value;
  }

  constructor(private route:ActivatedRoute, private router:Router, private projectDocumentDataService:ProjectDocumentDataService, private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
    this.loadData();
    //console.log(this.route.snapshot.queryParamMap.get('projectName'))
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData = data['resolvedData'];
      this.errorMessage=  resolvedData.error;
      this.selectedProjectName=resolvedData.selectedProjectName;
      this.onProjectDocumentListRetrieved(resolvedData.projectDocumentList);
      this.selectedProjectId= resolvedData.selectedProjectId;
    });
  }
  onProjectDocumentListRetrieved(data:IProjectDocumentDetail[]){
    this.projectDocumentList=data;
    this.collectionSize=data?.length;
  }  
  pageChanged(event){
    this.page=+event;
    this.selectedRow=-1;
  }  
  setClickedRow(data,index){
    this.selectedRow=index;
  }
  deleteButtonClick(id:number){
    if(confirm('You are about to delete a record. Are you sure?')){
      this.projectDocumentDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
    }
  }
  onRecordDeleted(data){
    if(data.rowsAffected==1){
      this.showToast=true;
      this.router.navigate(['projectdocumentlist',this.selectedProjectId],{
        queryParams:{projectName:this.selectedProjectName}      
      });
    }
  }
  closeToast(){
    this.showToast=false;
  }
  downloadButtonClick(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'ProjectDocumentMapping/download/' + id;
    const link = document.createElement('a');
    link.setAttribute('type','hidden');
    link.setAttribute('href',url);
    document.body.append(link);
    link.click();
    link.remove();

  }

}
// this.router.navigate(['projectdocumentlist',this.projectDocumentAdd.projectId],{
//   queryParams:{projectName:this.selectedProjectName}
// });