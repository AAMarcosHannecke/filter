import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {DialogComponent, FilterComponent} from './filter/filter.component';
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
  MatChipsModule,
  MatDialogModule
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
    MatChipsModule,
    MatDialogModule
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
    MatChipsModule,
    MatDialogModule
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
  declarations: [FilterComponent, DialogComponent],
  exports: [FilterComponent, DialogComponent]
})
export class FilterModule {
}
