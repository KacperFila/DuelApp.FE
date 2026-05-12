import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QuestionWithAnswers } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = `${environment.apiUrl}/questions`;

  public GetQuestionsAndAnswersBatch(
    batchSize: number,
  ): Observable<QuestionWithAnswers[]> {
    return this.httpClient.get<QuestionWithAnswers[]>(
      `${this.apiUrl}/${batchSize}`,
    );
  }
}
