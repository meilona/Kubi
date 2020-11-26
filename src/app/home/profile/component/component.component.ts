import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  items: any;
  key: any;
  constructor(public popoverCtrl: PopoverController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private router:Router,) {
    this.items = this.navParams.get('listData');
    this.key = this.navParams.get('key');
   }

  ngOnInit() {console.log("get key",this.key);}
  btnEditProfile(){
    let navigationExtra : NavigationExtras ={state:{key:this.key}}
    this.router.navigate(['/home/profile/' + this.key + '/editprofile'],navigationExtra);
    this.popoverCtrl.dismiss();
  }
  setting(){
    this.router.navigate(['/home/profile/' + this.key + '/setting']);
    this.popoverCtrl.dismiss();
  }

  // /home/profile/OtHXC9m43ifaxnK4o4Bj3oEG6W93

}
