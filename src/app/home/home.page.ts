import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';
import {Question} from '../models/question.model';
import {QuestionService} from '../services/question.service';
import {map} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private questionService: QuestionService,
      private userSrv: UserService,
  ) { }

  userEmail: string;
  userId: string;
  question: Question[];
  User: any;
  name: string; totalskor: number;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
    autoplay: 3000
  };

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        console.log(res.uid);
        this.userEmail = res.email;
        this.userId = res.uid;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
    console.log('userId : ', this.userId);

    this.question = this.questionService.getAllQuestion();

    // untuk ambil data berdasarkan id
    this.userSrv.getUser(this.userId).snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({data: c.payload.doc.data()}))
        )
    ).subscribe(data => {
      console.log(data);
      this.User = data;
      console.log(this.User[0].data.name);
      this.name = this.User[0].data.name;
      this.totalskor = this.User[0].data.totalskor;
    });
  }

  musik(){
    this.navCtrl.navigateForward('/question/questions');
    // console.log('to musik question');
  }

}
