import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPageComponent } from './question-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPageComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
