import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { NavController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { take, map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  User :any;
  key: string;
  name: string; email: string; birthDate: string; totalskor: number;
  liga: string; 

  @ViewChild('f', null) f: NgForm;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSrv: UserService,
    ) { }

 

  ngOnInit() {
    // untuk dapetin id nya
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('profileId')) { return; }
      
      const key = paramMap.get('profileId');
      this.key = key;
      console.log(key);

      // untuk ambil data berdasarkan id
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
    });

  }
}
