import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeloginPage } from './beforelogin.page';

const routes: Routes = [
  {
    path: '',
    component: BeforeloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeforeloginPageRoutingModule {}
