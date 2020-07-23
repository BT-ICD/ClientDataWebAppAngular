import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button'; //Added to get CSV button ICON with same format from NGPrime


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ButtonModule,
    NgbModule,
    TableModule
  ]
})
export class SharedModule { }
