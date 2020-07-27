import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServerDataService } from './project-server-data.service';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { IProjectServerType } from './iproject-server-type';

@Component({
  selector: 'app-project-server-list',
  templateUrl: './project-server-list.component.html',
  styleUrls: ['./project-server-list.component.css']
})
export class ProjectServerListComponent implements OnInit {
selectedRow:number;
errorMessage:string='';
page=0;
pageSize=10;
collectionSize=0;
showToast:boolean=false;
selectedProjectName:string='';
selectedProjectId:number;
selectedProjectServer:IProjectServerType;
cols:any[];
  private _projectServerList: IProjectServerType[];
  public get projectServerList(): IProjectServerType[] {
    return this._projectServerList;
  }
  public set projectServerList(value: IProjectServerType[]) {
    this._projectServerList = value;
  }

  constructor(private route:ActivatedRoute, private router:Router, private projectServerDataService:ProjectServerDataService, private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
    this.cols=[
      {field:'projectServerMappingId',header:'Id'},
      {field:'serverName',header:'Name'},
      {field:'deployedAsServerType',header:'Deployed Server Type'},
      {field:'urlToAccess',header:'URL'},
      {field:'databaseServerName',header:'Database Server'},
      {field:'dbName',header:'Database Name'},

    ];
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData = data['resolvedData'];
      this.errorMessage=resolvedData.error;
      this.selectedProjectId=resolvedData.selectedProjectId;
      this.selectedProjectName=resolvedData.selectedProjectName;
      this.onProjectServerListRetrieved(resolvedData.projectServerList);
    });
  }
  onProjectServerListRetrieved(data:IProjectServerType[]){
    this._projectServerList=data;
    this.collectionSize=data.length;
  }
  
  deleteButtonClick(id:number){
    if(confirm('You are about to delete a record. Are you sure?'))
      this.projectServerDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
  }
  onRecordDeleted(data){
    if(data.rowsAffected==1){
      this.showToast=true;
      this.router.navigate(['projectserverlist',this.selectedProjectId],{
        queryParams:{projectName:this.selectedProjectName}
      });
    }
  }
  closeToast(){
    this.showToast=false;
  }
  onRowSelect(event){

  }
  onRowUnSelect(event){

  }
}
