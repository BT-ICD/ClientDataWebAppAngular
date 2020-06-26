import { Component, OnInit } from '@angular/core';
import { IProjectDetail } from './iproject-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDataService } from './project-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
project:IProjectDetail;
errorMessage:string;
  constructor(private route:ActivatedRoute, private router:Router, private projectDataService:ProjectDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      const resolvedData= data['resolvedData'];
      this.errorMessage= resolvedData.error;
      this.onProjectRetrived(resolvedData.projectDetail);
    });
  }
  onProjectRetrived(data:IProjectDetail){
    this.project=data;
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      this.projectDataService.edit(this.project).subscribe((data)=>{
        this.router.navigate(['projectlist']);
      });
    }
  }
}
