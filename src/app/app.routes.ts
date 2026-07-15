import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components//home-page/home-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { QuestionPageComponent } from './features/duel/components/question-page/question-page.component';
import { MatchmakingPageComponent } from './features/matchmaking/components/matchmaking-page/matchmaking-page.component';

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
