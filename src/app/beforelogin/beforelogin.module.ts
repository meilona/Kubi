import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeforeloginPageRoutingModule } from './beforelogin-routing.module';

import { BeforeloginPage } from './beforelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeforeloginPageRoutingModule
  ],
  declarations: [BeforeloginPage]
})
export class BeforeloginPageModule {}
