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
  private _projectServerList: IProjectServerType[];
  public get projectServerList(): IProjectServerType[] {
    if(this._projectServerList){
      return this._projectServerList
      .map((projectServer,i)=>({id:i+1,...projectServer}))
      .slice((this.page-1)*this.pageSize, (this.page-1)*this.pageSize+this.pageSize);
    }
    return this._projectServerList;
  }
  public set projectServerList(value: IProjectServerType[]) {
    this._projectServerList = value;
  }

  constructor(private route:ActivatedRoute, private router:Router, private projectServerDataService:ProjectServerDataService, private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
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
  pageChanged(event){
    this.page=+event;
    this.selectedRow=-1;
  }
  setClickedRow(data, index){
    this.selectedRow=index;
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

}
