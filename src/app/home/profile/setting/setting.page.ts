import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
 tema: boolean = false;  
 

  constructor(private authService : AuthService,
    private router: Router,
    private storage: Storage) { 
    }

  ngOnInit() {
    
    // untuk dapetin share preferences
    this.storage.get('tema').then((val) => {
      console.log('Your age is', val);
    });
  }

  onClick(event){
    var state = false;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    // @ts-ignore
    systemDark.addListener(this.colorTest);
    // systemDark.addListener(this.colorTest);
    if (event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      // atur tema 1 untuk dark mode
      this.tema = true;
      this.storage.set('tema', this.tema);
      console.log('dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');

      // atur tema 0 untuk light mode
      this.tema = false;
      this.storage.set('tema', this.tema);
      console.log('light');
    }
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  logOut(){
    this.authService.logoutUser()
        .then(res => {
          console.log(res);
          this.router.navigate(['/beforelogin']);
        }, err => {
          console.dir(err);

        });
  }

}
