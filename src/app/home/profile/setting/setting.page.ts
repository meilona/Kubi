import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor() { }

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

}
