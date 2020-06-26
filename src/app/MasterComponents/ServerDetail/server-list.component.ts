import { Component, OnInit } from '@angular/core';
import { IServerDetail } from './iserver-details';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerDataService } from './server-data.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  selectedRow:number;
  errorMessage:string='';
  page=0;
  pageSize=10;
  collectionSize=0;
  showToast:boolean=false;
  private _serverList: IServerDetail[];

  public get serverList(): IServerDetail[] {
    //return this._serverList;
    if(this._serverList){
      return this._serverList
      .map((server, i) => ({ id: i + 1, ...server}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  else
  {
    this._serverList;
  }
  }
  public set serverList(value: IServerDetail[]) {
    this._serverList = value;
  }


  constructor(private route:ActivatedRoute, private router:Router, private serverDataService: ServerDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData = data['resolvedData'];
      this.errorMessage= resolvedData.error;
      this.onServerListRetrieved(resolvedData.serverList);
    });
  }
  onServerListRetrieved(data:IServerDetail[]){
    this.collectionSize= data?.length;
    this.serverList= data;
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
      this.serverDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
    }
  }
  onRecordDeleted(data){
    if(data.rowsAffected==1){
      this.showToast=true;
      this.router.navigate(['/serverlist']);
    }
  }
  closeToast(){
    this.showToast=false;
  }

}
