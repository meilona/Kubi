import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeforeloginPage } from './beforelogin.page';

describe('BeforeloginPage', () => {
  let component: BeforeloginPage;
  let fixture: ComponentFixture<BeforeloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeforeloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
