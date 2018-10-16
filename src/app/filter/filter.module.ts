import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FilterComponent} from './filter/filter.component';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatChipsModule
} from '@angular/material';


@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule
  ],
})
export class MyOwnCustomMaterialModule {
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MyOwnCustomMaterialModule
  ],
  declarations: [FilterComponent],
  exports: [FilterComponent]
})
export class FilterModule {
}
