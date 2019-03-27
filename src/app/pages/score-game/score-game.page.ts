import { MatchOverComponent } from './../../components/match-over/match-over.component';

import { ScoringService } from './../../services/scoring.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-game',
  templateUrl: './score-game.page.html',
  styleUrls: ['./score-game.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreGamePage implements OnInit {

  submitForm: FormGroup;
  showincrementer = false;

  gamepoint: any;

  right_score = 0;
  left_score = 0;

  gameresult: string;
  noofsets: number;


  deuce_point: number;

  leftmatchpoint: string;
  rightmatchpoint: string;
  gamenumber: number;
  matchresult: string;




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

  team0: any;
  combined_score_Arr = [[0, 0]];


  copyScoreArr = [[0, 0]];
  gamestats: IGameStats;

  format: number;

  sidea: any;
  sideb: any;

  sidea_left_odd: any;
  sidea_left_even: any;

  sideb_right_odd: any;
  sideb_right_even: any;

  doubles_start_settings = 'on';
  db_left_odd_serve_start = true;
  db_left_even_serve_start =  false;

  db_right_odd_serve_start = true;
  db_right_even_serve_start = false;

  // gamestats: IGameStats = {
  //   matchid: '101',
  //   teams: [{
  //     'name': 'TeamA', 'sets_won': 0, 'player1': 'A1', 'player2': 'A2',  'starting_serve' : '',
  //     games: [{ 'game': 1, 'score': 0, 'score_details': [], 'over': 'N', 'result': '' },
  //     ]
  //   },
  //   {
  //     'name': 'TeamB', 'sets_won': 0, 'player1': 'B1', 'player2': 'B2',  'starting_serve' : '',
  //     games: [{ 'game': 1, 'score': 0, 'score_details': [], 'over': 'N', 'result': '' },
  //     ]
  //   },
  //   ],

  //   format: 1,
  //   sets: 3,
  //   deuce: 30,
  //   game_point: 21,
  //   current_set: 1,
  //   winner: ''
  // };

  constructor(private _fb: FormBuilder, private _scoringService: ScoringService,
    private _modalcontroller: ModalController, private _router: Router,
    private alertController: AlertController,
    private _cdr: ChangeDetectorRef) {
    this.gamenumber = 1;
  }

  ngOnInit() {
    //debugger;
   // this.gamestats = this._scoringService.getGameData();

   

   

    this.getAsyncData();
  }

  ionViewDidEnter() {


  //  console.table(this.gamestats);
   

   this.copyScoreArr = [[0, 0]];
   this.combined_score_Arr = [[0, 0]];


   this._cdr.markForCheck();


  }

  async getAsyncData() {
    this._scoringService.gameconfig.subscribe(res => {
      this.gamestats = res;
// debugger;
      this.gamepoint = this.gamestats.game_point;
    this.noofsets = this.gamestats.sets;
    this.deuce_point = this.gamestats.deuce;
   
    this.format = this.gamestats.format;

this.tempLeft = this.gamestats.teams[0];
this.tempRight = this.gamestats.teams[1];


      this._cdr.markForCheck();
    });

    

    this._cdr.markForCheck();

  }


  addScoreRight() {
    this.scoring = 'on';

    this.doubles_start_settings =  'off';

    this.right_score = this.tempRight.games[this.gamestats.current_set - 1].score + 1;

    this.left_score = this.tempLeft.games[this.gamestats.current_set - 1].score;


    if (this.right_score === this.deuce_point) {


      this.gameresult = `${this.tempRight.name} won the game`;

      this.rightmatchpoint = 'Game';

      this.game = 'off';
      this.done = 'on';

      this.scoring = 'off';

      this.who_won = 'right';

      this._cdr.markForCheck();

    } else {

   if (this.right_score === this.left_score) {
        this.rightmatchpoint = '';
        this.leftmatchpoint = '';
        this._cdr.markForCheck();
      } else if (this.right_score > this.left_score) {

        if (this.right_score === (this.gamepoint - 1)) {
          this.rightmatchpoint = 'Game Point';
        }

        if (this.right_score >= this.gamepoint) {

          if ((this.right_score - 1) === this.left_score) {
            this.rightmatchpoint = 'Game Point';
          } else if ((this.right_score - 1) > this.left_score) {
            this.gameresult = `${this.tempRight.name} won the game`;

            this.rightmatchpoint = 'Game';

            this.game = 'off';
            this.done = 'on';

            this.scoring = 'off';

            this.who_won = 'right';

            this._cdr.markForCheck();
          }

        }
      }
    }




    this.tempRight.games[this.gamestats.current_set - 1].score = this.right_score;

    this.tempRight.games[this.gamestats.current_set - 1].score_details.push(this.right_score);
    this.tempLeft.games[this.gamestats.current_set - 1].score_details.push(this.left_score);



    this.combined_score_Arr.push(new Array(this.left_score, this.right_score));

    this.copyScoreArr = [...this.combined_score_Arr];

    this.copyScoreArr = this.copyScoreArr.reverse();

    if(this.sideb === 'Receive') {
      this.sideb = 'Serve';
      this.sidea = 'Receive';
    }

    if (this.sideb === 'Serve') {
      if ((this.right_score % 2) !== 0) {
        this.sidea_left_odd = 'Receive';
        this.sidea_left_even = '';

        this.sideb_right_odd = 'Serve';
        this.sideb_right_even = '';

      } else {
        this.sidea_left_odd = '';
        this.sidea_left_even = 'Receive';

        this.sideb_right_even = 'Serve';
        this.sideb_right_odd = '';
        
      }
    }
   // this.servechange();

   this.tempLeft.games[this.gamestats.current_set - 1].serve_receive = 'Receive';
    this.tempRight.games[this.gamestats.current_set - 1].serve_receive = 'Serve';

    this._cdr.markForCheck();
  }


  addScoreleft() {
    this.scoring = 'on';
   
    this.doubles_start_settings =  'off';
    this.left_score = this.tempLeft.games[this.gamestats.current_set - 1].score + 1;

    this.right_score = this.tempRight.games[this.gamestats.current_set - 1].score;

    if (this.left_score === this.deuce_point) {
      this.gameresult = `${this.tempLeft.name} won the game`;

      this.leftmatchpoint = 'Game';

      this.game = 'off';
      this.done = 'on';

      this.scoring = 'off';

      this.who_won = 'left';

      this._cdr.markForCheck();

    } else {
     if (this.left_score === this.right_score) {
        this.rightmatchpoint = '';
        this.leftmatchpoint = '';
        this._cdr.markForCheck();
      } else if (this.left_score > this.right_score) {

        if (this.left_score === (this.gamepoint - 1)) {
          this.leftmatchpoint = 'Game Point';
        }
        if (this.left_score >= this.gamepoint) {

          if ((this.left_score - 1) === this.right_score) {
            this.leftmatchpoint = 'Game Point';
          } else if ((this.left_score - 1) > this.right_score) {
            this.gameresult = `${this.tempLeft.name} won the game`;

            this.leftmatchpoint = 'Game';

            this.game = 'off';
            this.done = 'on';

            this.scoring = 'off';

            this.who_won = 'left';

            this._cdr.markForCheck();

          }

        }
      }
    }

    this.tempLeft.games[this.gamestats.current_set - 1].score = this.left_score;

    this.tempLeft.games[this.gamestats.current_set - 1].score_details.push(this.left_score);
    this.tempRight.games[this.gamestats.current_set - 1].score_details.push(this.right_score);


    this.tempLeft.games[this.gamestats.current_set - 1].serve_receive = 'Serve';
    this.tempRight.games[this.gamestats.current_set - 1].serve_receive = 'Receive';


    this.combined_score_Arr.push(new Array(this.left_score, this.right_score));

    this.copyScoreArr = [...this.combined_score_Arr];

    this.copyScoreArr = this.copyScoreArr.reverse();

    if (this.gamestats.format === 1) {
      if (this.sidea === 'Receive') {
        this.sidea = 'Serve';
        this.sideb = 'Receive';
      }
    }

    if (this.gamestats.format === 2) {
      if (this.sidea === 'Receive') {
        this.sidea = 'Serve';
        this.sideb = 'Receive';
      }

     

      if (this.sidea === 'Serve') {



        if(this.doubles_start_settings === 'on') {
          this.sidea_left_odd = 'Serve';
          this.sidea_left_even = 'Serve';
        }


        if ((this.left_score % 2) !== 0) {
          this.sidea_left_odd = 'Serve';
          this.sidea_left_even = '';

          this.sideb_right_odd = 'Receive';
          this.sideb_right_even = '';

        } else {
          this.sidea_left_odd = '';
          this.sidea_left_even = 'Serve';

          this.sideb_right_even = 'Receive';
          this.sideb_right_odd = '';
          
        }
      }

    }
    
    this._cdr.markForCheck();
  }

  chooseWhoServesLeftDoubles(side) {
    if(side === 'odd') {
      this.db_left_odd_serve_start = true;
      this.db_left_even_serve_start = false;

      this.db_right_odd_serve_start = true;
      this.db_right_even_serve_start = false;


    } else if(side === 'even') {
      this.db_left_odd_serve_start = false;
      this.db_left_even_serve_start = true;

      this.db_right_odd_serve_start = false;
      this.db_right_even_serve_start = true;
    }
    
  }

  chooseWhoServesRightDoubles(side) {

    if(side === 'odd') {
      this.db_left_odd_serve_start = true;
      this.db_left_even_serve_start = false;

      this.db_right_odd_serve_start = true;
      this.db_right_even_serve_start = false;


    } else if(side === 'even') {
      this.db_left_odd_serve_start = false;
      this.db_left_even_serve_start = true;

      this.db_right_odd_serve_start = false;
      this.db_right_even_serve_start = true;
    }
    
  }

  clickUndo() {


    if (this.scoring === 'on') {
      this.tempLeft.games[this.gamestats.current_set - 1].score_details.pop();
      this.tempRight.games[this.gamestats.current_set - 1].score_details.pop();



       this.tempLeft.games[this.gamestats.current_set - 1].score =
       [...this.tempLeft.games[this.gamestats.current_set - 1].score_details].pop();

       this.tempRight.games[this.gamestats.current_set - 1].score =
       [...this.tempRight.games[this.gamestats.current_set - 1].score_details].pop();

      this.combined_score_Arr.pop();

      this.copyScoreArr = [...this.combined_score_Arr];

      this.copyScoreArr = this.copyScoreArr.reverse();
      console.table(this.gamestats);

if (this.leftmatchpoint === 'Game' || this.rightmatchpoint === 'Game') {
  this.leftmatchpoint = '';
  this.rightmatchpoint = '';
  this.who_won = '';
  this.game = 'on';
  this.done = 'off';
}


      this.scoring = 'off';
    }


    this._cdr.markForCheck();

  }



  doneClick() {
    this.game = 'on';
    this.done = 'off';
    this.scoring = 'off';

    this.gameresult = '';
// debugger;
    if (this.who_won === 'left') {

      if ((this.tempLeft.sets_won + 1) === Math.ceil(this.noofsets / 2)) {
        this.matchresult = `${this.gamestats.teams[0].name} won the Match`;
        this.finish = 'on';
        this.done = 'on';
        this.game = 'off';
        this.scoring = 'off';
        this.gamestats.winner = this.tempLeft.name;

        this.tempLeft.games[this.gamenumber - 1].result = 'Win';
        this.tempRight.games[this.gamenumber - 1].result = 'Lose';

        this.tempRight.games[this.gamenumber - 1].set_over = 'Y';
        this.tempLeft.games[this.gamenumber - 1].set_over = 'Y';


        this.tempLeft.sets_won = this.tempLeft.sets_won + 1;

      } else {
        this.tempLeft.games[this.gamenumber - 1].result = 'Win';
        this.tempRight.games[this.gamenumber - 1].result = 'Lose';

        this.tempRight.games[this.gamenumber - 1].set_over = 'Y';
        this.tempLeft.games[this.gamenumber - 1].set_over = 'Y';

        this.gamenumber = this.gamenumber + 1;
        this.tempLeft.sets_won = this.tempLeft.sets_won + 1;

        this.tempLeft.games
          .push({'game': this.gamenumber, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_side': ''});
        this.tempRight.games
          .push({'game': this.gamenumber, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_side': ''});

        this.gamestats.current_set = this.gamestats.current_set + 1;

        this.leftmatchpoint = '';

  //      this.sidechange();
      }
    } else if (this.who_won === 'right') {
      if ((this.tempRight.sets_won + 1) === Math.ceil(this.noofsets / 2)) {

        this.matchresult = `${this.tempRight.name} won the Match`;
        this.finish = 'on';
        this.done = 'on';
        this.game = 'off';
        this.scoring = 'off';
        this.gamestats.winner = this.tempRight.name;
        this.tempRight.games[this.gamenumber - 1].result = 'Win';
        this.tempLeft.games[this.gamenumber - 1].result = 'Lose';

        this.tempRight.games[this.gamenumber - 1].set_over = 'Y';
        this.tempLeft.games[this.gamenumber - 1].set_over = 'Y';

        this.tempRight.sets_won = this.tempRight.sets_won + 1;

      } else {
        this.tempRight.games[this.gamenumber - 1].result = 'Win';
        this.tempLeft.games[this.gamenumber - 1].result = 'Lose';

        this.tempRight.games[this.gamenumber - 1].set_over = 'Y';
        this.tempLeft.games[this.gamenumber - 1].set_over = 'Y';

        this.gamenumber = this.gamenumber + 1;
        this.tempRight.sets_won = this.tempRight.sets_won + 1;

        this.tempLeft.games
          .push({'game': this.gamenumber, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_side': ''});
        this.tempRight.games
          .push({'game': this.gamenumber, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_side': ''});


        this.gamestats.current_set = this.gamestats.current_set + 1;



        this.rightmatchpoint = '';
   //     this.sidechange();
      }

    }



    if (this.finish === 'on') {
      this.openModal();
    }

    console.table(this.gamestats);
    this.copyScoreArr = [];
    this.combined_score_Arr = [];
 
    if (this.gamestats.current_set === 2) {
      this.tempLeft = this.gamestats.teams[1];
      this.tempRight = this.gamestats.teams[0];
    }

    if (this.gamestats.current_set === 3) {
      this.tempLeft = this.gamestats.teams[0];
      this.tempRight = this.gamestats.teams[1];
    }


    this._cdr.markForCheck();

  }



servechange() {
  if(this.sidea === 'Serve') {
    this.sidea = 'Receive';
    this.sideb = 'Serve';
  } else if (this.sidea === 'Receive') {
    this.sidea = 'Serve';
    this.sideb = 'Receive';
  }
}

  sidechange() {
    // this.tempLeft = this.gamestats.teams[0];
    // this.tempRight = this.gamestats.teams[1];
// debugger;

if ((this.gamestats.current_set - 1 ) === 2) {
  this.tempLeft = this.gamestats.teams[1];
  this.tempRight = this.gamestats.teams[0];
}

    const val_temp_left = this.tempLeft;
    const val_temp_right = this.tempRight;


    this.tempRight = val_temp_left;
    this.tempLeft = val_temp_right;

  }

  async openModal() {


    const modal = await this._modalcontroller.create({
      component: MatchOverComponent,
      componentProps: {
        results: JSON.stringify(this.gamestats),
        data: this.gamestats
      }
    });
    return await modal.present();
  }

  reset() {



    this.gameresult = '';
    this.leftmatchpoint = '';
    this.rightmatchpoint = '';

    this.game = 'on';
    this.done = 'off';
    this.scoring = 'off';

    this.tempLeft.games[this.gamestats.current_set - 1].score = 0;
    this.tempRight.games[this.gamestats.current_set - 1].score = 0;

    this.tempLeft.games[this.gamestats.current_set - 1].score_details = [];
    this.tempRight.games[this.gamestats.current_set - 1].score_details = [];

    this.copyScoreArr = [];
    this.combined_score_Arr = [];
    this._cdr.markForCheck();

  }

  async presentResetConfirm() {
   // debugger;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Deletes </strong> current game details !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.reset();
          }
        }
      ]
    });

    await alert.present();
  }


  settings() {
    this._router.navigateByUrl('/scoring-home');
  }

  closepop() {
    this.showincrementer = false;
  }


}
