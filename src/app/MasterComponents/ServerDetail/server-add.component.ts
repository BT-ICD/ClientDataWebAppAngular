import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ServerDataService } from './server-data.service';
import { IServerTypeDTODetail } from '../ServerType/iserver-type';
import { IServerDetail } from './iserver-details';


@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrls: ['./server-add.component.css']
})
export class ServerAddComponent implements OnInit {
server:IServerDetail;
serverTypeList:IServerTypeDTODetail[];
errorMessage:string;
  constructor(private serverDataService:ServerDataService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadServerTypes();
    this.serverDataService.getServerById(0).subscribe(data=>this.server=data);
  }
  loadServerTypes(){
    this.route.data.subscribe((data)=>{
      const resolvedData = data['resolveDataServerTypeList'];
      this.errorMessage =resolvedData.error;
      this.onServerTypeListRetrieved(resolvedData.ServerTypeDTODetailList);

    });
  }
  onServerTypeListRetrieved(data:IServerTypeDTODetail[]){
    this.serverTypeList= data;
    console.log(this.serverTypeList);
  }
  saveButtonClick(f:NgForm){
 //   console.log(f.valid);
  //  console.log(this.server);
 if(this.server.serverTypeId===0){
    alert("Select valid server type");
    return;
    }
    if(f.valid){
      this.serverDataService.add(this.server).subscribe(data=>{
        this.router.navigate(['/serverlist']);
      });
    }
  }

}
