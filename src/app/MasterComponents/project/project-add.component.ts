import { Component, OnInit } from '@angular/core';
import { IProjectDetail } from './iproject-detail';
import { Router } from '@angular/router';
import { ProjectDataService } from './project-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
project:IProjectDetail;
errorMessage:string;
  constructor(private projectDataService:ProjectDataService, private router:Router) { }

  ngOnInit(): void {
  this.projectDataService.getProjectById(0).subscribe(data=>this.project=data);
  }
  saveButtonClick(f:NgForm){
    if(f.valid){
      this.projectDataService.add(this.project).subscribe(data=>{
        this.router.navigate(['/projectlist']);
      });
    }
  }
}
