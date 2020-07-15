import { Component, OnInit } from '@angular/core';
import { IProjectServerType, IProjectServerMappingDTOAdd } from './iproject-server-type';
import { ProjectServerDataService } from './project-server-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IServerTypeDTODetail } from '../../ServerType/iserver-type';
import { IServerDTOFORLOV } from '../../ServerDetail/iserver-details';

@Component({
  selector: 'app-project-server-add',
  templateUrl: './project-server-add.component.html',
  styleUrls: ['./project-server-add.component.css']
})
export class ProjectServerAddComponent implements OnInit {
 projectServerType:IProjectServerType;
 serverTypeList:IServerTypeDTODetail[]
 serverList:IServerDTOFORLOV[];
// serverTypeList:ServerTypeL
selectedProjectName:String='';
selectedProjectId:number;
errorMessage:string='';

  constructor(private projectServerDataService:ProjectServerDataService, private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.projectServerType = this.projectServerDataService.initializedProjectServerDetail();
    this.loadData(); //Need to load server type details from resolver
  }
  loadData(){
    //access Project ID 
    this.route.paramMap.subscribe(params=>{
      this.selectedProjectId= +params.get('id');
    });
    // AccessProject name from URL - Query Params
    this.route.queryParamMap.subscribe(params=>{
      this.selectedProjectName = params.get('projectName');
    });
    this.route.data.subscribe((data)=>{
      const resolveDataServerTypeList = data['resolveDataServerTypeList'];
      const resolveDataServerList = data['resolveDataServerList'];
      console.log(resolveDataServerList);
      this.errorMessage = resolveDataServerTypeList.error;
      if(this.errorMessage){
        this.errorMessage += resolveDataServerList.error;
      }
      else{
        this.errorMessage = resolveDataServerList.error;
      }
      this.onServerTypeListRetrieved(resolveDataServerTypeList.ServerTypeDTODetailList);
      this.onServerListRetrieved(resolveDataServerList.serverListForLOV);
    });
     

  }
  onServerTypeListRetrieved(data:IServerTypeDTODetail[]){
    this.serverTypeList=data;
  }
  onServerListRetrieved(data:IServerDTOFORLOV[]){
    this.serverList=data;
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      // this.projectServerDataService
      const obj:IProjectServerMappingDTOAdd={
        projectId: this.selectedProjectId,
        serverId:this.projectServerType.serverId,
        deployedServerTypeId:this.projectServerType.deployedServerTypeId,
        urlToAccess:this.projectServerType.urlToAccess,
        deployedLocation:this.projectServerType.deployedLocation,
        appLogLocation:this.projectServerType.appLogLocation,
        dbServerID:this.projectServerType.dbServerID,
        dbName:this.projectServerType.dbName,
        notes:this.projectServerType.notes
      };
      console.log(obj);
      this.projectServerDataService.add(obj).subscribe(data=>{
        this.router.navigate(['projectserverlist',this.selectedProjectId],{
          queryParams:{projectName:this.selectedProjectName}
        });
      }); 

      
    }
  }


}
