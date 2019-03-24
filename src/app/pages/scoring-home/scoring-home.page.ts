import { ScoringService } from './../../services/scoring.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoring-home',
  templateUrl: './scoring-home.page.html',
  styleUrls: ['./scoring-home.page.scss'],
})
export class ScoringHomePage implements OnInit {

  activetab = true;
  singlesordoubles = 1;
  // player1: string;
  // player2: string;
  // player3: string;
  // player4: string;

  // activity: any;

  val: any;

  default_set = 3;
  default_game = 21;
  default_deuce = 30;
  default_singlesordoubles = 1;
  default_sides = 'Left';
  default_player1 = 'Player1';
  default_player2 = 'Player2';
  default_isdeucerule = true;
  default_teama = 'Team A';
  default_teamb = 'Team B';

  player1 = 'Serve';
  player2 = 'Receive';

  submitForm: FormGroup;
  showincrementer = false;
  serviceInfo: IActivity;


  isdeuce = 'off';

  constructor(private _fb: FormBuilder, private _router: Router,
    private _scoringService: ScoringService, ) {

    this.serviceInfo = {
      player1: 'Serve',
      player2: 'Receive',
    };
  }

  ngOnInit() {
    this.submitForm = this._fb.group({
      'singlesordoubles': new FormControl(this.default_singlesordoubles, Validators.required),
      'sides': new FormControl(this.default_sides, Validators.required),
      'teama': new FormControl(this.default_teama, Validators.required),
      'teamb': new FormControl(this.default_teamb, Validators.required),
      'noofsets': new FormControl(this.default_set, Validators.required),
      'dummy': new FormControl(null),
      'gamepoint': new FormControl(this.default_game, Validators.required),
      'deucepoint': new FormControl(this.default_deuce, Validators.required),
      'player1': new FormControl(this.default_player1, Validators.required),
      'player2': new FormControl(this.default_player2, Validators.required),
      'player3': new FormControl(null),
      'player4': new FormControl(null),
      'isdeucerule': new FormControl(this.default_isdeucerule, Validators.required)


    });
  }

  setToDefault() {
    this.submitForm.patchValue({
      noofsets: this.default_set,
      gamepoint: this.default_game,
      deucepoint: this.default_deuce,
    });
  }

  saveSettings() {
    this._scoringService.gameSettings(this.submitForm);
    this._router.navigateByUrl('/score-game');
  }

  serveorreceive(player, serveinfo) {
    console.log('player ' + player + 'server info ' + serveinfo);
    if ((player === 'player1' && serveinfo === 'receive') || (player === 'player2' && serveinfo === 'serve')) {
      this.player1 = 'Receive';
      this.player2 = 'Serve';

      this.serviceInfo = {
        player2: 'Serve',
        player1: 'Receive',

      };
    } else if ((player === 'player1' && serveinfo === 'serve') || (player === 'player2' && serveinfo === 'receive')) {
      this.player1 = 'Serve';
      this.player2 = 'Receive';

      this.serviceInfo = {
        player1: 'Serve',
        player2: 'Receive',

      };
    }
  }

  setSinglesorDoubles(players: number) {
    this.singlesordoubles = players;
    this.submitForm.patchValue({
      singlesordoubles: players
    });
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
    } else if (this.val === 'game') {

      let value = this.submitForm.value.gamepoint;

      value = isNaN(value) ? 0 : value;
      value++;
      this.submitForm.patchValue({
        gamepoint: value,
        dummy: value
      });
    } else if (this.val === 'deuce') {


      let value = this.submitForm.value.deucepoint;

      value = isNaN(value) ? 0 : value;
      value++;

      this.submitForm.patchValue({
        deucepoint: value,
        dummy: value
      });
    }

  }

  decreaseValue() {
    if (this.val === 'set') {
      this.submitForm.patchValue({
        noofsets: 1,
        dummy: 1
      });
    } else if (this.val === 'game') {
      let value = this.submitForm.value.gamepoint;

      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      this.submitForm.patchValue({
        gamepoint: value,
        dummy: value

      });
    } else if (this.val === 'deuce') {
      let value = this.submitForm.value.deucepoint;

      value = isNaN(value) ? 0 : value;

      if(value > 21) {
        
        value--;
        this.submitForm.patchValue({
          deucepoint: value,
          dummy: value
  
        });
      }

      
    }
  }

  closepop() {
    this.showincrementer = false;
  }

  onClick(event) {
    //console.log('object.....' + event.target.checked);
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

  //  increaseValue() {
  //   let value = this.submitForm.value.gamepoint;

  //   value = isNaN(value) ? 0 : value;
  //   value++;
  //   this.submitForm.patchValue({
  //     gamepoint: value,
  //   });
  // }

  //  decreaseValue() {
  //   let value = this.submitForm.value.gamepoint;

  //   value = isNaN(value) ? 0 : value;
  //   value < 1 ? value = 1 : '';
  //   value--;
  //   this.submitForm.patchValue({
  //     gamepoint: value,

  //   });
  // }

}

interface IActivity {
  player1: string;
  player2: string;
  // player1serve: string;
  // player1receive: string;
  // player2serve: string;
  // player2receive: string;
}
