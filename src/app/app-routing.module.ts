import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilterComponent} from './filter/filter/filter.component';
import {TestComponentComponent} from './components/test-component/test-component.component';

const routes: Routes = [
  {
    path: 'filter', component: FilterComponent,
  },
  {
    path: '', component: TestComponentComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
