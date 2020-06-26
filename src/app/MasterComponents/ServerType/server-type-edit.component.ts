import { Component, OnInit } from '@angular/core';
import { IServerTypeDTODetail } from './iserver-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerTypeDataService } from './server-type-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-server-type-edit',
  templateUrl: './server-type-edit.component.html',
  styleUrls: ['./server-type-edit.component.css']
})
export class ServerTypeEditComponent implements OnInit {
  serverType:IServerTypeDTODetail;
  errorMessage:string;
  constructor(private route:ActivatedRoute, private router:Router, private serverTypeDataService: ServerTypeDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  //Fetch data from Resolver and initialize object or error
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData= data['resolvedData']
      this.errorMessage= resolvedData.error;
      this.onServerTypeRetrieved(resolvedData.serverTypeDTO);
    })
  }
  onServerTypeRetrieved(data:IServerTypeDTODetail){
    console.log(JSON.stringify(data));
    this.serverType= data;
  }
  saveButtonClick(f:NgForm){
    // To access values from htmo form object and need to ensure form must be in valid state prior to save record
    // console.log('isvalid: ' + f.valid);
    // console.log(f.value);
    // console.log(f.value.serverTypeId);
    // console.log(f.value.name);
    if(f.valid){
      this.serverTypeDataService.edit(this.serverType).subscribe(data=>{
        this.router.navigate(['/servertype']);
      });
    }
  }
}
