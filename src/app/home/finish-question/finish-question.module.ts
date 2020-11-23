import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishQuestionPageRoutingModule } from './finish-question-routing.module';

import { FinishQuestionPage } from './finish-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishQuestionPageRoutingModule
  ],
  declarations: [FinishQuestionPage]
})
export class FinishQuestionPageModule {}
