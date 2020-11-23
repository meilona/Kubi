import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishQuestionPage } from './finish-question.page';

describe('FinishQuestionPage', () => {
  let component: FinishQuestionPage;
  let fixture: ComponentFixture<FinishQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
