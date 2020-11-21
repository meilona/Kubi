import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { take, map } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  key: string;
  User :any;
  name: string; email: string; birthDate: string; totalskor: number;liga: string; 
  @ViewChild('f',null) f:NgForm;
  constructor(private router: Router,
    private userSrv: UserService,) {
    this.key = this.router.getCurrentNavigation().extras.state.key; // should log out 'bar'
  }
  
  ngOnInit() {
    console.log("ini key", this.key);
    this.userSrv.getUser(this.key).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({data: c.payload.doc.data()}))
        )
    ).subscribe(data => {
      console.log(data);
      this.User = data;
      console.log(this.User[0].data.name);
      this.name = this.User[0].data.name;
      this.email = this.User[0].data.email;
      this.birthDate = this.User[0].data.birthDate;
      this.totalskor = this.User[0].data.totalskor;
      this.liga = this.User[0].data.liga;
    });
  }
  onSubmit(form : NgForm){
    console.log('onSubmit');
    console.log(form);
    if(form.invalid){
      return;
    }
    form.value.birthDate = this.birthDate;
    form.value.totalskor = this.totalskor;
    form.value.liga = this.liga;
    console.log(form.value);
    // this.userSrv.updateProfile(this.key, form.value);
  }
  onFinish(){
    this.router.navigate(['/home/profile/',this.key]);
  }

}
