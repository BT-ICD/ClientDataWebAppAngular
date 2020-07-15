import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectServerDataService } from './project-server-data.service';
import { IProjectServerMappingDTOEdit } from './iproject-server-type';
import { IServerTypeDTODetail } from '../../ServerType/iserver-type';
import { IServerDTOFORLOV } from '../../ServerDetail/iserver-details';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-server-edit',
  templateUrl: './project-server-edit.component.html',
  styleUrls: ['./project-server-edit.component.css']
})
export class ProjectServerEditComponent implements OnInit {
projectServerType:IProjectServerMappingDTOEdit;
serverTypeList:IServerTypeDTODetail[];
serverList:IServerDTOFORLOV[];
errorMessage:String;
  constructor(private projectServerDataService: ProjectServerDataService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe((data)=>{
        const resolvedData = data['resolvedData'];
        const resolveDataServerTypeList=data['resolveDataServerTypeList'];
        const resolveDataServerList= data['resolveDataServerList'];
      
        this.onProjectServerRetrieved(resolvedData.projectServerDetail);
        this.onServerTypeListRetrieved(resolveDataServerTypeList.ServerTypeDTODetailList)
        this.onServerListRetrieved(resolveDataServerList.serverListForLOV);

        this.errorMessage =resolvedData.error;
        this.errorMessage+=resolveDataServerTypeList.error;
        this.errorMessage+=resolveDataServerList.error;
      }
    );
  }

  onProjectServerRetrieved(data:IProjectServerMappingDTOEdit){
    this.projectServerType= data;
  }
  onServerTypeListRetrieved(data:IServerTypeDTODetail[]){
    this.serverTypeList=data;
  }
  onServerListRetrieved(data:IServerDTOFORLOV[]){
    this.serverList=data;
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      this.projectServerDataService.edit(this.projectServerType).subscribe(data=>{
        this.router.navigate(['projectserverlist',this.projectServerType.projectId],{
          queryParams:{projectName:this.projectServerType.projectName}
        });
      });
    }
  }
}
