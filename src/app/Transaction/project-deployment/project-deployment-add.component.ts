import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProjectDeploymentDataService } from './project-deployment-data.service';
import { IServerDTOFORLOV } from 'src/app/MasterComponents/ServerDetail/iserver-details';
import { IProjectDeploymentAdd } from './project-deployment-types';

@Component({
  selector: 'app-project-deployment-add',
  templateUrl: './project-deployment-add.component.html',
  styleUrls: ['./project-deployment-add.component.css']
})
export class ProjectDeploymentAddComponent implements OnInit {
  
  selectedProjectId:number;
  selectedProjectName:string;
  errorMessage:string='';
  serverList:IServerDTOFORLOV[];
  projectDeploymentAdd:IProjectDeploymentAdd={
    projectId:0,
    deploymentDate:null,
    serverId:null,
    features:'',
    version:'',
    notes:'',
    file:null
  }
  fileData:File=null;
  previewUrl:any=null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  projectDeploymentForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute, private router:Router, private projectDeploymentDataService:ProjectDeploymentDataService) { }

  ngOnInit(): void {
    this.loadData();
    console.log(this.serverList);

    this.selectedProjectId = +this.route.snapshot.params['id'];
    this.selectedProjectName = this.route.snapshot.queryParamMap.get('projectName');
    this.projectDeploymentAdd.projectId= this.selectedProjectId;

    this.projectDeploymentForm = this.formBuilder.group(
      {
        projectId:[this.selectedProjectId],
        deploymentDate:[Date.now,Validators.required],
        serverId:[null,Validators.required],
        features:['',Validators.required],
        version:['',Validators.required],
        notes:[''],
        file:[null,Validators.required]
      }
    );
  }
loadData(){
  this.route.data.subscribe((data)=>{
    const resolveDataServerList=data['resolveDataServerList']
    this.errorMessage= resolveDataServerList.error;
    
    this.onServerListRetrieved(resolveDataServerList.serverListForLOV);
  });  
}
onServerListRetrieved(data:IServerDTOFORLOV[]){
  this.serverList=data;
}
fileProgress(fileInput:any){
  this.fileData = <File>fileInput.target.files[0];
}
save():void{

  console.log('save clicked')
  console.log('valid ' + this.projectDeploymentForm.valid);
  console.log('Form model: ' + JSON.stringify(this.projectDeploymentForm.value));
  if(this.projectDeploymentForm.valid){
    const formData = new FormData();
    formData.append('projectId', this.projectDeploymentForm.get('projectId').value);
    formData.append('deploymentDate', this.projectDeploymentForm.get('deploymentDate').value);
    formData.append('serverId', this.projectDeploymentForm.get('serverId').value);
    formData.append('features', this.projectDeploymentForm.get('features').value);
    formData.append('version', this.projectDeploymentForm.get('version').value);
    formData.append('notes', this.projectDeploymentForm.get('notes').value);
    formData.append('file', this.fileData);
    this.projectDeploymentDataService.add(formData).subscribe(
      (data)=> {
        this.router.navigate(['/projectdeployment',this.selectedProjectId], {
          queryParams:{projectName:this.selectedProjectName}
        });
      }
    );
  }
}
}
