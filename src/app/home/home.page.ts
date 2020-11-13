import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userEmail: string;
  userName: string;

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
  ) { }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        console.log(res.displayName);
        this.userEmail = res.email;
        this.userName = res.displayName;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });

  }

  logout() {
    this.authService.logoutUser()
        .then(res => {
          console.log(res);
          this.navCtrl.navigateBack('');
        })
        .catch(error => {
          console.log(error);
        });
  }

  musik(){
    console.log("to musik question");
  }

}
