import { MatchOverComponent } from './../../components/match-over/match-over.component';

import { ScoringService } from './../../services/scoring.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-game',
  templateUrl: './score-game.page.html',
  styleUrls: ['./score-game.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreGamePage implements OnInit {

  activetab = true;


  submitForm: FormGroup;
  showincrementer = false;
  serviceInfo: IActivity;



  gamepoint: any;


right_score = 0;
left_score = 0;

  gameresult: string;
  noofsets: string;

  format: string;
  deuce_point: number;

  leftmatchpoint: string;
  rightmatchpoint: string;
  gamenumber: number;
  matchresult: string;



  right_game_won = 0;
  left_game_won = 0;

  game = 'on';
  done = 'off';
  finish = 'off';
  scoring = 'off';

  who_won: string;

  player1: string;
  player2: string;
  player3: string;
  player4: string;

  sides: string;

  tempLeft: any;
  tempRight: any;

  tempLeftScores: number[] = [];
  tempRightScores: number[] = [];

  scores_A: number[] = [0];
  scores_B: number[] = [0];

  testa: any;

  //  itemstest = [
  //   [1, 2],
  //   [3, 4],
  //   [5, 6]
  // ];


  itemstest = [
    [0, 0],
   
  ];

dummy: any;
tempArray: any;

  gamestats: IGameStats = {
    matchid: '101',
    teams: [{ 'name': 'TeamA', 'game' : 0, 'player1': 'A1', 'player2': 'A2', 'initial_side': 'left',
            games: [{ 'game': 1, 'score': 0, 'score_details': [], 'over': 'N', 'result': ''},

            ] },
            { 'name': 'TeamB', 'game' : 0, 'player1': 'B1', 'player2': 'B2', 'initial_side': 'right',
            games: [{ 'game': 1, 'score': 0, 'score_details': [], 'over': 'N', 'result': '' },

            ] },
    ],

    format: 1,
    sets: 3,
    current_set: 1,
    winner: ''
  };



 

  constructor(private _fb: FormBuilder, private _scoringService: ScoringService,
    private _modalcontroller: ModalController, private _router: Router,
    private _cdr: ChangeDetectorRef) {

    this.gamenumber = 1;


  }

  ngOnInit() {
    this.submitForm = this._fb.group({
      'leftside': new FormControl('', Validators.required),
      'rightside': new FormControl('', Validators.required),
    });

    this.getAsyncData();


  }

  async getAsyncData() {
    this.format = await this._scoringService.getItems('SINGLES_DOUBLES');
    this.sides = await this._scoringService.getItems('SIDES');
    this.noofsets = await this._scoringService.getItems('NOOFSETS');
    this.gamepoint = await this._scoringService.getItems('GAME_POINT');
    this.deuce_point = parseInt(<string>await this._scoringService.getItems('DEUCE_POINT'), 0);

    this.player1 = await this._scoringService.getItems('PLAYER1');
    this.player2 = await this._scoringService.getItems('PLAYER2');
    this.player3 = await this._scoringService.getItems('PLAYER3');
    this.player4 = await this._scoringService.getItems('PLAYER4');



if(this.gamestats.teams[0].initial_side === 'left') {
  this.tempLeft = this.gamestats.teams[0];
  this.tempRight = this.gamestats.teams[1];
} else if(this.gamestats.teams[0].initial_side === 'right') {
  this.tempLeft = this.gamestats.teams[1];
  this.tempRight = this.gamestats.teams[0];
}






    this._cdr.markForCheck();
    console.log('object >>>> ' + this.gamepoint);
  }


  addScoreRight() {
// debugger;
    this.scoring = 'on';
    this.tempRightScores = [];
   
    this.right_score = this.tempRight.games[this.gamestats.current_set - 1].score + 1;
    this.left_score =  this.tempLeft.games[this.gamestats.current_set - 1].score;
 
     this.tempRight.games[this.gamestats.current_set - 1].score = this.right_score;
     this.tempRight.games[this.gamestats.current_set - 1].score_details.push(this.right_score);
     this.tempLeft.games[this.gamestats.current_set - 1].score_details.push(0);

     this.tempRightScores = this.tempRight.games[this.gamestats.current_set - 1].score_details.reverse();
     this.tempLeftScores = this.tempLeft.games[this.gamestats.current_set - 1].score_details.reverse();

     this.itemstest.push(new Array(this.left_score, this.right_score));

    this._cdr.markForCheck();

    if (this.right_score === this.deuce_point) {

      this._cdr.markForCheck();

    } else {

      if (this.right_score === this.left_score) {
        this.rightmatchpoint = '';
        this.leftmatchpoint = '';
        this._cdr.markForCheck();
      } else if (this.right_score > this.left_score) {
        if (this.right_score >= this.gamepoint) {

          if ((this.right_score - 1) === this.left_score) {
            this.rightmatchpoint = 'Game Point';
          } else if ((this.right_score - 1) > this.left_score) {
           
            this._cdr.markForCheck();
          }

        }
      }
    }

    this._cdr.markForCheck();
  }

test() {
  console.log('object test .. ');

}

 reverseArray(arr) {
 //  debugger;
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}
  addScoreleft() {
    
 //debugger;

    this.scoring = 'on';
    this.tempLeftScores = [];
   
   this.left_score = this.tempLeft.games[this.gamestats.current_set - 1].score + 1;
   this.right_score =  this.tempRight.games[this.gamestats.current_set - 1].score;

    this.tempLeft.games[this.gamestats.current_set - 1].score = this.left_score;
    this.tempLeft.games[this.gamestats.current_set - 1].score_details.push(this.left_score);
    this.tempRight.games[this.gamestats.current_set - 1].score_details.push(0);
// debugger;
    this.tempLeftScores = this.tempLeft.games[this.gamestats.current_set - 1].score_details.reverse();
    this.tempRightScores = this.tempRight.games[this.gamestats.current_set - 1].score_details.reverse();
    
    
     this.itemstest.push(new Array(this.left_score, this.right_score));
// console.log('object...' + JSON.stringify(this.itemstest));

    //  this.itemstest = this.reverseArray(this.itemstest);
    //  console.log('object..af.' + JSON.stringify(this.itemstest));
     this.tempArray = [...this.itemstest];

    this.tempArray = this.tempArray.reverse();

//console.log('objectmmm ' + this.tempArray);
    

   // console.log('object reverse ' +  tempArray.reverse());

    this._cdr.markForCheck();
  }


  clickUndo() {

    const last_score_teamA = this.scores_A[this.scores_A.length - 1];
    const last_score_teamB = this.scores_B[this.scores_B.length - 1];

    if (last_score_teamA === 0) {

    } 


    if (last_score_teamB === 0) {

    }


    this.scores_A.pop();
    this.scores_B.pop();

  }


  doneClick() {
    this.game = 'on';
    this.done = 'off';



    if (this.who_won === 'left') {


      if ((this.left_game_won + 1) === Math.ceil(parseInt(this.noofsets, 10) / 2)) {
        this.matchresult = `${this.gamestats.teams[0].name} won the Match`;
        this.finish = 'on';
        this.done = 'on';
        this.game = 'off';
        this.scoring = 'off';
      } else {
        this.left_game_won = this.left_game_won + 1;
       
        this.scores_A.splice(1, this.scores_A.length);
        this.scores_B.splice(1, this.scores_B.length);

        
        this.leftmatchpoint = '';
        this.gamenumber = this.gamenumber + 1;

      }

  



    } else if (this.who_won === 'right') {

      if ((this.right_game_won + 1) === Math.ceil(parseInt(this.noofsets, 10) / 2)) {
        this.matchresult = `${this.gamestats.teams[1].name} won the Match`;
        this.finish = 'on';
        this.done = 'on';
        this.game = 'off';
        this.scoring = 'off';
      } else {
        this.right_game_won = this.right_game_won + 1;
        this.scores_A.splice(1, this.scores_A.length);
        this.scores_B.splice(1, this.scores_B.length);
        this.rightmatchpoint = '';
        this.gamenumber = this.gamenumber + 1;
      }
    }

    if (this.gamenumber === 1) {
      this.gamestats.teams[0].games[0].score_details = this.scores_A;
      this.gamestats.teams[1].games[0].score_details = this.scores_B;
      
    } else if (this.gamenumber === 2) {
      this.gamestats.teams[0].games[1].score_details = this.scores_A;
      this.gamestats.teams[1].games[1].score_details = this.scores_B;
    } else if (this.gamenumber === 3) {
      this.gamestats.teams[0].games[2].score_details = this.scores_A;
      this.gamestats.teams[1].games[2].score_details = this.scores_B;
    }


    if (this.finish === 'on') {
      this.openModal();
    }

this._cdr.markForCheck();

  }


  async openModal() {


    const modal = await this._modalcontroller.create({
      component: MatchOverComponent,
      componentProps: {
        results: 'hello'
      }
    });
    modal.present();
  }

  reset() {
    this.scores_A.splice(1, this.scores_A.length);
    this.scores_B.splice(1, this.scores_B.length);
    this.gameresult = '';
    this.leftmatchpoint = '';
    this.rightmatchpoint = '';
    this.gamenumber = 1;

    this.game = 'on';
    this.done = 'off';
    this.scoring = 'off';

    this.left_game_won = 0;

    this.right_game_won = 0;
  }


  settings() {
    this._router.navigateByUrl('/scoring-home');
  }

  closepop() {
    this.showincrementer = false;
  }


}

interface IActivity {
  player1: string;
  player2: string;

}


interface IGameStats {
  matchid: string;
  teams: ITeamStats[];
  
  format: number;
  sets: number;
  current_set: number;
  winner: string;
}

interface ITeamStats {
  name: string;
  game: number;
  player1: string;
  player2: string;
  initial_side: string;
  games: Igames[];

}

interface Igames {
  game: number;
  score: number;
  score_details: number[];
  over: string;
  result: string;
  
}

