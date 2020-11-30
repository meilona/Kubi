import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {map} from 'rxjs/operators';
import {NavController, PopoverController} from '@ionic/angular';
import {stringify} from 'querystring';
import { PopoverComponent } from '../component/popover/popover.component';
import { HintComponent } from '../component/hint/hint.component';

// interface Questions {
//   // id: string;
//   answer: string;
//   questions: string;
//   choice1: string;
//   choice2: string;
//   choice3: string;
//   choice4: string;
//   hint: string;
// }

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  userId: any;
  totalScore: any;
  kategori: any; 
  materi: any; 
  asw: any; 
  petunjuk: any; 

  // CONSTANTS
  rightScore = 10;
  maxQuestions = 5;

  // Question from firebase
  loadedQuestion: any;
  tempQuestion: any[];
  questions: any[];
  i: number;

  currentQuestion: any;

  rightAnswers = false;
  score = 0;
  questionCounter = 0;
  availableQuesions: any[];
  private question: HTMLElement;
  private choices: Element[];


  constructor(
      private activatedRoute: ActivatedRoute,
      private questionService: QuestionService,
      private navCtrl: NavController,
      private router: Router,
      private pop: PopoverController,
  ) { }

  ngOnInit() {
    this.userId = this.router.getCurrentNavigation().extras.state.userId;
    this.totalScore = this.router.getCurrentNavigation().extras.state.totalScore;
    this.kategori = this.router.getCurrentNavigation().extras.state.kategori;
    console.log("Kategori : " + this.kategori);
    console.log('uId: ' + this.userId);
    console.log('totalskor: ' + this.totalScore);
    this.question = document.getElementById('question');
    this.choices = Array.from(document.getElementsByClassName('choice-text'));
    //get kategori from 
    
    // get questions from firebase based on kategori
    this.questionService.getQuest(this.kategori).snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({data: c.payload.doc.data()}))
        )
    ).subscribe(data => {
      this.questions = [ ];
      // this.choices = [ ];
      this.tempQuestion = data;

      for (this.i = 0; this.i < this.tempQuestion.length ; this.i++) {
        this.loadedQuestion = this.tempQuestion[this.i].data;
        const choices = this.loadedQuestion.listanswer.split(',');
        const quest = {
          kategori: this.loadedQuestion.kategori,
          answer: this.loadedQuestion.answer,
          question: this.loadedQuestion.question,
          choice1: choices[0],
          choice2: choices[1],
          choice3: choices[2],
          choice4: choices[3],
          hint: this.loadedQuestion.hint,
          materi: this.loadedQuestion.materi
        };
        this.questions.push(quest);
        // this.choices.push(quest.choice1);
      }
      console.log(this.questions);
      console.log(this.choices);
      this.startGame();
    });
  }

  ionViewWillEnter() {
    // this.question = document.getElementById('question');
    // this.choices = Array.from(document.getElementsByClassName('choice-text'));
  }

  startGame = () => {
    this.questionCounter = 0;
    this.score = 0;
    this.availableQuesions = this.questions;
    console.log(this.questions);
    this.getNewQuestion();
  }

  getNewQuestion = () => {
    if (this.availableQuesions.length === 0 || this.questionCounter >= this.maxQuestions) {
      return this.router.navigate(['/home/finish-question'], {
        state: { score: this.score , userId: this.userId , totalScore: this.totalScore}
      });
    }
    this.questionCounter++;
    const questionIndex = Math.floor(Math.random() * this.availableQuesions.length);
    this.currentQuestion = this.availableQuesions[questionIndex];

    this.question.innerHTML = this.currentQuestion.question;
    console.log("this question : " + this.currentQuestion);
    console.log("this curr question : " + this.currentQuestion.hint);
    // buat nampung materi dan answer di popover
    this.materi = this.currentQuestion.materi; 
    this.asw = this.currentQuestion.answer; 
    // buat nampung hint di popover
    this.petunjuk = this.currentQuestion.hint;
    console.log("kategori question: " + this.kategori);
    console.log("question : " + this.question);
    console.log("petunjuk : " + this.petunjuk);

    this.choices.forEach((choice) => {
      const num = choice.attributes[1].value;
      choice.innerHTML = this.currentQuestion['choice' + num];
    });

    this.availableQuesions.splice(questionIndex, 1);
    // this.rightAnswers = true;
  }

  async presentPopover() {
    console.log("materi: " + this.materi);
    const popover = await this.pop.create({
      component: PopoverComponent,
      // cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      cssClass: 'my-custom-class',
      componentProps: {key: this.materi, asw: this.asw}
    });
    return await popover.present();
  }

  selectedAnswer(e){
    // const selectedChoice = e.target.innerText;
    const selectedChoice = document.getElementsByClassName('choice-container')[e].lastChild.textContent;
    console.log(selectedChoice);
    const selectedAnswer = this.currentQuestion.answer;
    console.log(selectedAnswer + ' banding ' + selectedChoice);
    if (selectedAnswer !== selectedChoice){
      console.log('salah');
      // panggil pop over
      this.presentPopover();
      this.rightAnswers = false;
    } else {
      this.rightAnswers = true;
      console.log('benar');
      this.score += this.rightScore;
      console.log('score : ' + this.score);
    }
    this.getNewQuestion();
    this.rightAnswers = false;
  }

  async hintPopOver() {
    console.log("hint: " + this.petunjuk);
    const popover = await this.pop.create({
      component: HintComponent,
      // cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      cssClass: 'my-custom-class',
      componentProps: {key: this.petunjuk}
    });
    return await popover.present();
  }

  hint(){
    this.hintPopOver();
  }

  
}
