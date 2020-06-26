import { Component, OnInit } from '@angular/core';
import { IServerTypeDTODetail } from './iserver-type';
import { ServerTypeDataService } from './server-type-data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-server-type-add',
  templateUrl: './server-type-add.component.html',
  styleUrls: ['./server-type-add.component.css']
})
export class ServerTypeAddComponent implements OnInit {
  serverType:IServerTypeDTODetail
  constructor(private serverTypeDataService: ServerTypeDataService, private router:Router) { }

  ngOnInit(): void {
    this.serverTypeDataService.getServerTypeById(0).subscribe(data=>this.serverType=data);
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      this.serverTypeDataService.add(this.serverType).subscribe(data=>{
        this.router.navigate(['/servertype']);
      });
    }
  }
}
