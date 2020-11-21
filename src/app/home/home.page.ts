import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';
import {Question} from '../models/question.model';
import {QuestionService} from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userEmail: string;
  userId: string;
  question: Question[];

  constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.question =this.questionService.getAllQuestion();

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
    this.navCtrl.navigateForward('/question/questions');
    // console.log('to musik question');
  }

}
