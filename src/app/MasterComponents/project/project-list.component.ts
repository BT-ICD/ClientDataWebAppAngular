import { Component, OnInit } from '@angular/core';
import { IProjectDetail } from './iproject-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDataService } from './project-data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
selectedRow:number;
errorMessage:string='';
page=0;
pageSize=10;
collectionSize=0;
showToast:boolean=false;
  private _projectList: IProjectDetail[];
  public get projectList(): IProjectDetail[] {
    //return this._projectList;
    if(this._projectList){
      return this._projectList
      .map((project,i)=>({id:i+1, ...project}))
      .slice((this.page-1)*this.pageSize, (this.pageSize-1)*this.pageSize+this.pageSize);
    }
    else{
      return this._projectList;
    }
  }
  public set projectList(value: IProjectDetail[]) {
    this._projectList = value;
  }
  constructor(private route:ActivatedRoute, private router:Router, private projectDataService:ProjectDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe(
      (data)=>{
       
        const resolvedData = data['resolvedData'];
        this.errorMessage= resolvedData.error;
        this.onProjectListRetrieved(resolvedData.projectList);
      }
    );
  }
  onProjectListRetrieved(data:IProjectDetail[]){
    this.collectionSize= data?.length;
    this.projectList= data;
   
  }
  pageChanged(event){
    this.page=+event;
    this.selectedRow=-1;
  }
  setClickedRow(data, index){
    this.selectedRow=index;
  }
  deleteButtonClick(id:number){
    if(confirm('You are about to delete a record. Are you sure?')){
      this.projectDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
    }
  }
  onRecordDeleted(data){
    if(data.rowsAffected==1){
      this.showToast=true;
      this.router.navigate(['/projectlist']);
    }
  }
  closeToast(){
    this.showToast=false;
  }

}
