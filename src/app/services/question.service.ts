import { Injectable } from '@angular/core';
import { Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private question: Question[] = [
    {
      id: 'item1',
      kategori: 'musik',
      questions: 'pertanyaan 1',
      choices1: 'pilihan 1',
      choices2: 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item2',
      kategori: 'makanan',
      questions: 'pertanyaan 1',
      choices1 : 'pilihan 1',
      choices2 : 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    },
    {
      id: 'item3',
      kategori: 'tempat',
      questions: 'pertanyaan 1',
      choices1 : 'pilihan 1',
      choices2 : 'pilihan 2',
      choices3: 'pilihan3',
      choices4: 'pilihan4'
    }];

  constructor() { }

  getAllQuestion(){
    return[...this.question];
  }

  getQuestion(id: string){
    return {...this.question.find(question => {
      return question.id === id;
    })};
  }
}
