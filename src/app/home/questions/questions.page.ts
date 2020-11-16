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
  constructor(
      private activatedRoute: ActivatedRoute,
      private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('questionId')){ return; }
      const questionId = paramMap.get('questionId');
      this.loadedQuestion = this.questionService.getQuestion(questionId);
    });
  }

}
