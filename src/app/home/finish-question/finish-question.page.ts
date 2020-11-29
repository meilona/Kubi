import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-finish-question',
  templateUrl: './finish-question.page.html',
  styleUrls: ['./finish-question.page.scss'],
})
export class FinishQuestionPage implements OnInit {
  nilai: any;
  userId: any;
  totalScore: any;
  constructor(private router: Router,
              private userSrv: UserService) {
    const navigation = this.router.getCurrentNavigation();
    this.nilai = navigation.extras.state.score;
    this.userId = navigation.extras.state.userId;
    this.totalScore = navigation.extras.state.totalScore;
    console.log('End Score: ' + this.nilai);
    console.log('userId: ' + this.userId);
    console.log('Total Score Awal: ' + this.totalScore);
  }

  ngOnInit() {
    this.totalScore += this.nilai;
    console.log('New Score: ' + this.totalScore);
    this.userSrv.updateScore(this.userId, this.totalScore);
  }

}
