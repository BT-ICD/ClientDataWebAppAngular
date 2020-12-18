import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'

/*Third Party References */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button'; //Added to get CSV button ICON with same format from NGPrime
import {CalendarModule} from 'primeng/calendar'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    NgbModule,
    TableModule,
    CalendarModule
  ]
})
export class SharedModule { }
