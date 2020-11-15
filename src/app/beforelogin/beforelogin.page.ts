import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';


@Component({
  selector: 'app-beforelogin',
  templateUrl: './beforelogin.page.html',
  styleUrls: ['./beforelogin.page.scss'],
})
export class BeforeloginPage implements OnInit {

  @ViewChild(IonSlides)
  slides: IonSlides;

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
  }


  
 finish() {
  //  await this.storage.set('slideComplete', false);
   this.navCtrl.navigateForward('/login');
  }

  next(){
    this.slides.slideNext();
  }

}
