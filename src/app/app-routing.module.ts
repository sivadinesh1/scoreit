import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'scoring-home', loadChildren: './pages/scoring-home/scoring-home.module#ScoringHomePageModule' },
  { path: 'settings', loadChildren: './pages/admin/settings/settings.module#SettingsPageModule' },
  { path: 'score-game', loadChildren: './pages/score-game/score-game.module#ScoreGamePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
