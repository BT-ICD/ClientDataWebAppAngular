import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IServerDetail } from './iserver-details';
import { ServerDataService } from './server-data.service';
import { NgForm } from '@angular/forms';
import { IServerTypeDTODetail } from '../ServerType/iserver-type';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {
server:IServerDetail;
serverTypeList:IServerTypeDTODetail[];
errorMessage:string;
  constructor(private route:ActivatedRoute, private router:Router, private serverDataService:ServerDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData= data['resolvedData'];
      this.errorMessage= resolvedData.error;
      
      this.onServerRetrieved(resolvedData.serverDetail);
      const resolveDataServerTypeList= data['resolveDataServerTypeList'];
      this.onServerTypeListRetrieved(resolveDataServerTypeList.ServerTypeDTODetailList);
      if(this.errorMessage) {
        this.errorMessage+=resolveDataServerTypeList.error;
      }
      else{
        this.errorMessage=resolveDataServerTypeList.error;
      } 
    });
  }
  onServerRetrieved(data:IServerDetail){
    this.server= data;
  }
  onServerTypeListRetrieved(data:IServerTypeDTODetail[]){
    this.serverTypeList= data;
    //console.log(this.serverTypeList);
  }
  saveButtonClick(f:NgForm){
    if(this.server.serverTypeId===0){
      alert("Select valid server type");
      return;
      }
    if(f.valid){
      this.serverDataService.edit(this.server).subscribe((data)=>{
        this.router.navigate(['/serverlist']);
      });
    }
  }
}
