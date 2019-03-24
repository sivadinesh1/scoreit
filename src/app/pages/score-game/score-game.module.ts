import { SharedModule } from './../../shared.module';
import { SplitPipe } from './../../util/pipes/split.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScoreGamePage } from './score-game.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreGamePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScoreGamePage]
})
export class ScoreGamePageModule {}
