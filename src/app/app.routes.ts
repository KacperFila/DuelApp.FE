import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { MatchmakingPageComponent } from './shared/matchmaking-page/matchmaking-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { QuestionPageComponent } from './features/duel/components/question-page/question-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'matchmaking',
    component: MatchmakingPageComponent,
  },
  {
    path: 'duel/:duelId',
    component: QuestionPageComponent,
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
];
