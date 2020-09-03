import { Component, OnInit } from '@angular/core';
import { IServerDTOFORLOV } from 'src/app/MasterComponents/ServerDetail/iserver-details';
import { IProjectDeploymentDetail } from './project-deployment-types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDeploymentDataService } from './project-deployment-data.service';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { IServerForProjects } from 'src/app/CommonServices/commontype';

@Component({
  selector: 'app-project-deployment-edit',
  templateUrl: './project-deployment-edit.component.html',
  styleUrls: ['./project-deployment-edit.component.css']
})
export class ProjectDeploymentEditComponent implements OnInit {
selectedProjectId:number;
selectedProjectName:string;
downloadUrl:string='';
errorMessage:string='';
serverList:IServerForProjects[];
filterServerList:IServerForProjects[];
projectDeployment:IProjectDeploymentDetail;
fileData:File=null;
projectDeploymentForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute, private router:Router, private projectDeploymentDataService:ProjectDeploymentDataService, private dataConstantsService: DataConstantsService) { }

  ngOnInit(): void {
  this.loadData();
  let datestr = this.projectDeployment.deploymentDate.toLocaleString();
  // console.log('datestr :'+datestr);
  let initialDate:Date =  new Date(new Date(datestr).toLocaleDateString()) ;
  datestr = initialDate.getFullYear() + '-'+ ((initialDate.getMonth()+1)).toString().padStart(2,'0') + '-' + initialDate.getDate().toString().padStart(2,'0');

  
  // console.log('initial date '+initialDate);
  // console.log('datestr: '+datestr);
  this.projectDeploymentForm = this.formBuilder.group({
    projectDeploymentId:[this.projectDeployment.projectDeploymentId, Validators.required],
    projectId:[this.projectDeployment.projectId,Validators.required],
    deploymentDate:[datestr, Validators.required],
    serverId:[this.projectDeployment.serverId,Validators.required],
    features:[this.projectDeployment.features, Validators.required],
    version:[this.projectDeployment.version,Validators.required],
    notes:[this.projectDeployment.notes],
    file:[null]
  });
  // console.log(this.projectDeployment.deploymentDate);
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      
      const resolvedData = data['resolvedData'];
      this.selectedProjectId = resolvedData.selectedProjectId;
      this.selectedProjectName= resolvedData.selectedProjectName;
      const resolveDataServerList = data['resolveDataServerList'];
      if(resolvedData.error!=null)
      this.errorMessage=resolvedData.error;

      if(resolveDataServerList.error!=null)
      this.errorMessage += resolveDataServerList.error; 
      
      this.onServerListRetrieved(resolveDataServerList.serverList);
      this.onProjectDeploymentRetrieved(resolvedData.projectDeployment);
    

    });
  }
  onServerListRetrieved(data:IServerForProjects[]){
    this.serverList=data;
    this.filterServerList = this.serverList.filter((m:IServerForProjects)=>m.projectId===this.selectedProjectId);
  }
  onProjectDeploymentRetrieved(data:IProjectDeploymentDetail){
    this.projectDeployment= data;
    this.downloadUrl = this.dataConstantsService.BASEAPIURL +'projectdeployment/download/' + this.projectDeployment.projectDeploymentId;

  }
  fileProgress(fileInput:any){
    this.fileData = <File>fileInput.target.files[0];
  }
  save():void{
    // console.log('save clicked');
    // console.log('valid '+ this.projectDeploymentForm.valid);
    // console.log('Form model: ' + JSON.stringify(this.projectDeploymentForm.value));
    if(this.projectDeploymentForm.valid){
      const formData = new FormData();
      formData.append('projectDeploymentId', this.projectDeploymentForm.get('projectDeploymentId').value);
      formData.append('projectId', this.projectDeploymentForm.get('projectId').value);
      formData.append('deploymentDate', this.projectDeploymentForm.get('deploymentDate').value);
      formData.append('serverId', this.projectDeploymentForm.get('serverId').value);
      formData.append('features', this.projectDeploymentForm.get('features').value);
      formData.append('version', this.projectDeploymentForm.get('version').value);
      formData.append('notes', this.projectDeploymentForm.get('notes').value);
      if(this.fileData!=null)
      {
        formData.append('file', this.fileData);
      }
      this.projectDeploymentDataService.edit(formData).subscribe(
        (data)=> {
          this.router.navigate(['/projectdeployment',this.selectedProjectId], {
            queryParams:{projectName:this.selectedProjectName}
          });
        }
      );
    }
  }

}
