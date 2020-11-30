import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



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
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    // untuk dapetin share preferences
    this.storage.get('tema').then((val) => {
      console.log('Your age is', val);
      if(val === false){
        document.body.setAttribute('data-theme', 'light');
      } else {
        document.body.setAttribute('data-theme', 'dark');
      }
    });
  }
  
 finish() {
  //  await this.storage.set('slideComplete', false);
   this.navCtrl.navigateForward('/login');
  }

  next(){
    this.slides.slideNext();
  }

}
