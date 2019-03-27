import { ScoringService } from './../../services/scoring.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoring-home',
  templateUrl: './scoring-home.page.html',
  styleUrls: ['./scoring-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringHomePage implements OnInit {

 // gamestats = ScoringService.GAMESTATS;

  activetab = true;
  singlesordoubles = 1;


  val: any;

  default_set = 3;
  default_game = 21;
  default_deuce = 30;
  // default_singlesordoubles = 1;
  default_sides = 'Left';
  default_player1 = 'Player1';
  default_player2 = 'Player2';
  default_isdeucerule = true;
  default_teama = 'Team A';
  default_teamb = 'Team B';

  

  submitForm: FormGroup;
  showincrementer = false;

  team_0 = 'Serve';
  team_1 = 'Receive';

  isdeuce = 'off';

  gamestats: IGameStats = {
    matchid: '101',
    teams: [{
      'name': 'TeamA', 'sets_won': 0, 'player1': 'A1', 'player2': 'A2',  'starting_serve': '',
      games: [{ 'game': 1, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_receive': '' },
      ]
    },
    {
      'name': 'TeamB', 'sets_won': 0, 'player1': 'B1', 'player2': 'B2', 'starting_serve': '',
      games: [{ 'game': 1, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_receive': '' },
      ]
    },
    ],

    format: 1,
    sets: 3,
    deuce: 30,
    game_point: 21,
    current_set: 1,
    winner: ''
  };



  constructor(private _fb: FormBuilder, private _router: Router, private _cdr: ChangeDetectorRef,
    private _scoringService: ScoringService, ) {




  }

  ngOnInit() {
    this.submitForm = this._fb.group({
      // 'singlesordoubles': new FormControl(this.default_singlesordoubles, Validators.required),
      'sides': new FormControl(this.default_sides, Validators.required),
      team_0: new FormControl(this.default_teama, Validators.required),
      team_1: new FormControl(this.default_teamb, Validators.required),
      'noofsets': new FormControl(this.default_set, Validators.required),
      'dummy': new FormControl(null),
      'gamepoint': new FormControl(this.default_game, Validators.required),
      'deucepoint': new FormControl(this.default_deuce, Validators.required),
      'player1': new FormControl(null, Validators.required),
      'player2': new FormControl(null, Validators.required),
      'player3': new FormControl(null),
      'player4': new FormControl(null),
      


    });
    this.serveorreceive('team_0', 'Serve');
  }

  ionViewDidEnter() {
  
  }

  setToDefault() {
    this.submitForm.patchValue({
      sides: this.default_sides,
      noofsets: this.default_set,
      gamepoint: this.default_game,
      deucepoint: this.default_deuce,
      player1: null,
      player2: null,
      player3: null,
      player4: null,
      team_0: this.default_teama,
      team_1: this.default_teamb

    });

    this.serveorreceive('team_0', 'Serve');
    // this.singlesordoubles = 1;
    this.setSinglesorDoubles(1);
    this.activetab = true;

    this.isdeuce = 'off';

  }

  saveSettings() {
// debugger;
    this.gamestats.teams[0].name = this.submitForm.value.team_0 === null ? 'Team A' : this.submitForm.value.team_0;
    this.gamestats.teams[1].name = this.submitForm.value.team_1 === null ? 'Team B' : this.submitForm.value.team_1;

    console.log('object...' + this.gamestats.format);

if (this.gamestats.format === 1) {

  this.gamestats.teams[0].player1 = this.submitForm.value.player1 === null ? 'Player 1' : this.submitForm.value.player1;
  this.gamestats.teams[1].player1 = this.submitForm.value.player2 === null ? 'Player 2' : this.submitForm.value.player2;
} else if (this.gamestats.format === 2) {
  this.gamestats.teams[0].player1 = this.submitForm.value.player1 === null ? 'Player 1' : this.submitForm.value.player1;
  this.gamestats.teams[0].player2 = this.submitForm.value.player3 === null ? 'Player 3' : this.submitForm.value.player3;

  this.gamestats.teams[1].player1 = this.submitForm.value.player2 === null ? 'Player 2' : this.submitForm.value.player2;
  this.gamestats.teams[1].player2 = this.submitForm.value.player4 === null ? 'Player 4' : this.submitForm.value.player4;

} 
// debugger;
   // this._scoringService.setGameData(this.gamestats);

   this._scoringService.setgameconfig(this.gamestats);
   this._cdr.markForCheck();

    this._router.navigateByUrl('/score-game');
  } 

  serveorreceive(team, serveinfo) {
      // debugger;

    if ((team === 'team_0' && serveinfo === 'Serve') ) {
      this.gamestats.teams[0].starting_serve = 'yes';
      this.gamestats.teams[1].starting_serve = 'no';

      this.gamestats.teams[0].games[0].serve_receive = 'Serve';
      this.gamestats.teams[1].games[0].serve_receive = 'Receive';
      this.team_0 = 'Serve';
      this.team_1 = 'Receive';

    }

    if ((team === 'team_1' && serveinfo === 'Serve') ) {
      this.gamestats.teams[1].starting_serve = 'yes';
      this.gamestats.teams[0].starting_serve = 'no';

      this.gamestats.teams[1].games[0].serve_receive = 'Serve';
      this.gamestats.teams[0].games[0].serve_receive = 'Receive';


      this.team_0 = 'Serve';
      this.team_1 = 'Receive';
    }

    this._cdr.markForCheck();

  }

  setSinglesorDoubles(players: number) {
    this.singlesordoubles = players;


    this.gamestats.format = players;

    // console.table(this.gamestats);
  }

  showIncrementer(val) {


    if (val === 'set') {
      this.showincrementer = true;
      this.val = val;
      this.submitForm.patchValue({
        dummy: this.submitForm.value.noofsets
      });



    } else if (val === 'game') {
      this.showincrementer = true;
      this.val = val;
      this.submitForm.patchValue({
        dummy: this.submitForm.value.gamepoint
      });

    } else if (val === 'deuce') {
      if (this.isdeuce === 'on') {
        this.showincrementer = false;
      } else if (this.isdeuce === 'off') {
        this.showincrementer = true;
        this.val = val;
        this.submitForm.patchValue({
          dummy: this.submitForm.value.deucepoint
        });


      }


    }




  }

  increaseValue() {
    if (this.val === 'set') {
      this.submitForm.patchValue({
        noofsets: 3,
        dummy: 3
      });

      this.gamestats.sets = this.submitForm.value.noofsets;

    } else if (this.val === 'game') {

      let value = this.submitForm.value.gamepoint;

      value = isNaN(value) ? 0 : value;
      value++;
      this.submitForm.patchValue({
        gamepoint: value,
        dummy: value
      });

      this.gamestats.game_point = this.submitForm.value.gamepoint;


    } else if (this.val === 'deuce') {


      let value = this.submitForm.value.deucepoint;

      value = isNaN(value) ? 0 : value;
      value++;

      this.submitForm.patchValue({
        deucepoint: value,
        dummy: value
      });

      this.gamestats.deuce = this.submitForm.value.deucepoint;


    }

    console.table(this.gamestats);

    this._cdr.markForCheck();

  }

  decreaseValue() {
    if (this.val === 'set') {
      this.submitForm.patchValue({
        noofsets: 1,
        dummy: 1
      });

      this.gamestats.sets = this.submitForm.value.noofsets;


    } else if (this.val === 'game') {
      let value = this.submitForm.value.gamepoint;

      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      this.submitForm.patchValue({
        gamepoint: value,
        dummy: value

      });

      this.gamestats.game_point = this.submitForm.value.gamepoint;

    } else if (this.val === 'deuce') {
      let value = this.submitForm.value.deucepoint;

      value = isNaN(value) ? 0 : value;

      if (value > 21) {

        value--;
        this.submitForm.patchValue({
          deucepoint: value,
          dummy: value

        });
      }

      this.gamestats.deuce = this.submitForm.value.deucepoint;
    }

    console.table(this.gamestats);

    this._cdr.markForCheck();
  }

  closepop() {
    this.showincrementer = false;
  }

  onClick(event) {

    const check = event.target.checked;
    if (check) {

      this.isdeuce = 'on';

      this.submitForm.patchValue({
        deucepoint: 21,
      });
    } else {
      this.isdeuce = 'off';
    }


  }

  onSubmit() {

  }

}


