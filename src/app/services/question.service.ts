import { Injectable } from '@angular/core';
import { Question} from '../models/question.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../models/user.model';

// interface Questions {
//   id: string;
//   answer: string;
//   questions: string;
//   choice1: string;
//   choice2: string;
//   choice3: string;
//   choice4: string;
//   hint: string;
// }

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private question: Question[] = [
    {
      id: 'item1',
      category: 'Musik',
      image: 'https://i1.wp.com/satujam.com/data/2015/06/indonesian-tradition.blogspot.in_.jpg?fit=900%2C600&ssl=1',
      questions: 'pertanyaan 1',
      choices1: 'pilihan 1',
      choices2: 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item2',
      category: 'Makanan',
      image: 'https://cdn.idntimes.com/content-images/post/20181212/kuliner-indonessdsdia-87489b810390089e5d15cb5fbdc66865_600x400.jpg',
      questions: 'pertanyaan 1',
      choices1 : 'pilihan 1',
      choices2 : 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item3',
      category: 'Tempat',
      image: 'https://cdn.idntimes.com/content-images/community/2019/02/2018-02-01-39875-1517462499-large-60d97e6631e637497c2db252b926af17_600x400.jpg',
      questions: 'pertanyaan 1',
      choices1 : 'pilihan 1',
      choices2 : 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    }];
  private dbPath = 'questions';
  userRef: AngularFirestoreCollection<any>;

  constructor(
      private db: AngularFirestore
  ) { }

  getAllQuestion(){
    return[...this.question];
  }

  getQuestion(questionId: string){
    return {...this.question.find(question => {
      return question.id === questionId;
    })};
  }

  // ambil questions dari firebase
  getQuest(): AngularFirestoreCollection<any>{
    this.userRef = this.db.collection<any>(this.dbPath, ref => ref);
    console.log(this.userRef);
    return this.userRef;
  }
}
