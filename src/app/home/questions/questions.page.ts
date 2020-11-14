import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  loadedQuestion: Question;
  // question: Question[];

  constructor(
      private activatedRoute: ActivatedRoute,
      private questionService: QuestionService,
      private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('questionid')){ return; }
      const questionid = paramMap.get('questionid');

      this.loadedQuestion = this.questionService.getQuestion(questionid);
      // console.log(this.loadedQuestion.id);
    });
  }

}
