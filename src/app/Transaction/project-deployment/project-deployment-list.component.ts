import { Component, OnInit } from '@angular/core';
import { IProjectDeploymentDetail, IProjectDeploymentEdit } from './project-deployment-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDeploymentDataService } from './project-deployment-data.service';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';

@Component({
  selector: 'app-project-deployment-list',
  templateUrl: './project-deployment-list.component.html',
  styleUrls: ['./project-deployment-list.component.css']
})
export class ProjectDeploymentListComponent implements OnInit {
projectDeploymentList:IProjectDeploymentDetail[];
errorMessage:string='';
showToast:boolean=false;
selectedProjectName:string='';
selectedProjectId:number;
selectedProjectDeployment:IProjectDeploymentEdit;
cols:any[];

  constructor(private route:ActivatedRoute, private router:Router, private projectDeploymentDataService:ProjectDeploymentDataService, private dataConstantsService: DataConstantsService) { }

  ngOnInit(): void {
    this.cols=[
      {field:'projectDeploymentId',header:'id'},
      {field:'projectName',header:'Project'},
      {field:'deploymentDate',header:'Deployed on'},
      {field:'serverName',header:'Server'},
      {field:'version',header:'Version'}
    ];
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe(
      (data)=>{
        const resolvedData = data['resolvedData'];
        this.errorMessage=resolvedData.error;
        this.selectedProjectName= resolvedData.selectedProjectName;
        this.selectedProjectId=  resolvedData.selectedProjectId;
        this.onProjectDeploymentListRetrieved(resolvedData.projectDeploymentList);
      }
    );
  }
  onProjectDeploymentListRetrieved(data:IProjectDeploymentDetail[]){
    this.projectDeploymentList= data;

  }
  deleteButtonClick(id:number){
    if(confirm('You are about to delete a record. Are you sure?')){
      this.projectDeploymentDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
    }
  }
  onRecordDeleted(data){
    if(data.rowsAffected==1){
      this.showToast=true;
      this.router.navigate(['projectdeployment',this.selectedProjectId],
      {
        queryParams:{projectName:this.selectedProjectName}
      });
    }
  }
  onRowSelect(event){

  }
  onRowUnSelect(event){

  }
  closeToast(){
    this.showToast=false;
  }
  getDownloadUrl(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'projectDeployment/download/' + id;
    return url;
  }
}
