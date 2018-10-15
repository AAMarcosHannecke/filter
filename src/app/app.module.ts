import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { AppRoutingModule } from './app-routing.module';
import {FilterModule} from './filter/filter.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
