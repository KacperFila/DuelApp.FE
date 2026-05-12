import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap, filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { QuestionsService } from '../../services/questions.service';
import { QuestionWithAnswers } from '../../models/question.model';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss',
})
export class QuestionPageComponent implements OnInit {
  protected duelId$ = this.route.paramMap.pipe(
    map((params) => params.get('duelId')),
    filter((id): id is string => id !== null),
  );

  protected questionsWithAnswers$ = this.duelId$.pipe(
    switchMap(() => this.questionsService.GetQuestionsAndAnswersBatch(5)),
  );

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}
}
