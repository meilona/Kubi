import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userEmail: string;
  userId: string;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        console.log(res.uid);
        this.userEmail = res.email;
        this.userId = res.uid;
        console.log("homekey",this.userId);
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
  }
  goToLeaderboard(){
    this.navCtrl.navigateForward(['leaderboard']);
  }
  goToProfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        key: this.userId
      }
    };
    this.navCtrl.navigateForward(['profile'],navigationExtras);
  }

}
