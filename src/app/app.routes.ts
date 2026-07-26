import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components//home-page/home-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MatchmakingPageComponent } from './features/matchmaking/components/matchmaking-page/matchmaking-page.component';
import { DuelComponent } from './features/duel/components/duel/duel.component';
import { duelLeaveGuard } from './core/guards/duel-leave.guard';

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
    component: DuelComponent,
    canDeactivate: [duelLeaveGuard],
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
];
