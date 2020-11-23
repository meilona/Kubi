import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishQuestionPage } from './finish-question.page';

const routes: Routes = [
  {
    path: '',
    component: FinishQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishQuestionPageRoutingModule {}
