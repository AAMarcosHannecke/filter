import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FilterComponent } from './filter/filter.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [FilterComponent],
  exports: [FilterComponent]
})
export class FilterModule { }
