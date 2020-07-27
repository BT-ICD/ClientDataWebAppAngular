import { Component, OnInit } from '@angular/core';
import { IServerTypeDTODetail } from './iserver-type';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ServerTypeDataService } from './server-type-data.service';

@Component({
  selector: 'app-server-type-list',
  templateUrl: './server-type-list.component.html',
  styleUrls: ['./server-type-list.component.css']
})
export class ServerTypeListComponent implements OnInit {
  private _serverTypeList: IServerTypeDTODetail[];
  selectedRow: number;
  errorMessage = '';
  page = 0;
  pageSize = 10;
  collectionSize = 0;
  selectedServerType:IServerTypeDTODetail;
  cols:any[];

  public get serverTypeList(): IServerTypeDTODetail[] {
   return   this._serverTypeList;
  }
  public set serverTypeList(value: IServerTypeDTODetail[]) {
    this._serverTypeList = value;
  }


  constructor(private route: ActivatedRoute, private serverTypeDataService:ServerTypeDataService, private router:Router) {

  }
  ngOnInit(): void {
    this.loadData();
  
  }
  private loadData() {
    this.cols=[
      {field:'serverTypeId',header:'Id'},
      {field:'name',header:'Name'}
    ];
    this.route.data.subscribe((data) => {
      const resolvedData = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onServerListRetrived(resolvedData.ServerTypeDTODetailList);
    });
  }

  onServerListRetrived(data: IServerTypeDTODetail[]) {
    this.collectionSize = data?.length;
    this.serverTypeList = data;
  }
  onRowSelect(event){

  }
  onRowUnSelect(event){

  }
  deleteButtonClick(id:number){
    //console.log('delete button clicked for: ' + id);
    if(confirm(`You are about to delete record. Are you sure?`)){
      this.serverTypeDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));      
    }
  }
  onRecordDeleted(data){
     if(data.rowsAffected==1){
      this.router.navigate(['/servertype']);
    }
  }
}
//To refresh data after deleting a record on same page - https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
