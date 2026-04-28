import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DuelSignalrService } from '../../services/duel-signalr.service';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss',
})
export class QuestionPageComponent implements OnInit {
  constructor(private signalRService: DuelSignalrService) {}

  private fb: FormBuilder = new FormBuilder();
  protected questionForm: FormGroup = this.fb.group({
    userAnswer: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.signalRService.connect();
  }

  protected onSubmit(): void {
    this.signalRService.testUserRouting();
  }
}
