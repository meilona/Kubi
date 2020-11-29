import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private authService : AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onClick(event){
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    // @ts-ignore
    systemDark.addListener(this.colorTest);
    // systemDark.addListener(this.colorTest);
    if (event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      console.log('dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
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
