import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeDataService } from './document-type-data.service';
import { DataConstantsService } from 'src/app/CommonServices/data-constants.service';
import { IDocumentTypeDTODetail } from './idocument-type-types';



@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
})
export class DocumentTypeListComponent implements OnInit {
documentTypeList:IDocumentTypeDTODetail[]
errorMessage:String;
selectedDocumentType:IDocumentTypeDTODetail;
showToast:boolean=false;
//Prime table ...
cols: any[];

  constructor(private route:ActivatedRoute, private router:Router, private documentTypeDataService: DocumentTypeDataService, private dataConstantsService: DataConstantsService) { }

  ngOnInit(): void {
    this.loadData();
    this.cols=[
      {field:'documentTypeId', header:'Id'},
      {field:'name', header:'Type name'},
    ];
  }
loadData(){
  this.route.data.subscribe((data)=>{
    const resolvedData = data['resolvedData'];
    this.errorMessage =resolvedData.error;
    this.onDocumentTypeListRetrieved(resolvedData.documentTypeList ) ;
  });
}
onDocumentTypeListRetrieved(data:IDocumentTypeDTODetail[]){
  this.documentTypeList = data;
  
}
onRowSelect(event){
 // console.log('Row Selected' + JSON.stringify(event) + event.data.documentTypeId + ' ' + event.data.name);

}
onRowUnselect(event){
  //console.log('Row unselected' + JSON.stringify(event));
  // console.log('Row Unselected' + JSON.stringify(event) + event.data.documentTypeId + ' ' + event.data.name);
}
deleteButtonClick(id:number){
  if(confirm('You are about to delete a record. Are you sure?')){
    this.documentTypeDataService.delete(id).subscribe(data=>this.onRecordDeleted(data));
  }
}
onRecordDeleted(data){
  if(data.rowsAffected==1){
    this.showToast=true;
    this.router.navigate(['documenttypelist']);
  }
}
closeToast(){
  this.showToast=false;
}
}
