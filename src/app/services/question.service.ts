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
      image: 'assets/image/Kategori_Musik.png',
      questions: 'pertanyaan 1',
      choices1: 'pilihan 1',
      choices2: 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item2',
      category: 'Makanan',
      image: 'assets/image/Kategori_Makanan.png',
      questions: 'pertanyaan 1',
      choices1 : 'pilihan 1',
      choices2 : 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item3',
      category: 'Tempat',
      image: 'assets/image/Kategori_Tempat.png',
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
