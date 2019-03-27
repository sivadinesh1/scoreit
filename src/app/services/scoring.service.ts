import { FormGroup } from '@angular/forms';


import { Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  

  public   GAMESTATS: IGameStats = {
    matchid: '101',
    teams: [{
      'name': 'TeamA', 'sets_won': 0, 'player1': 'A1', 'player2': 'A2',  'starting_serve': '',
      games: [{ 'game': 1, 'score': 0, 'score_details': [], 'set_over': 'N', 'result': '', 'serve_receive': '' },
      ]
    },
    {
      'name': 'TeamB', 'sets_won': 0, 'player1': 'B1', 'player2': 'B2',  'starting_serve': '',
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

  public _gameconfig = new BehaviorSubject<IGameStats>(this.GAMESTATS);

  gameData: any;

  authenticationState = new Subject();

  online$: Observable<boolean>;

  tempuserauthenticated: any;


  constructor(private storage: Storage, private plt: Platform,
    private toastController: ToastController,
  ) {

    this.plt.ready().then(() => {
      console.log('when calling 1');
     
    });
  }


  get gameconfig() {
    console.log('when calling 1@@' + this._gameconfig);
    return this._gameconfig.asObservable();
  }


  setgameconfig(val: IGameStats) {
    this._gameconfig.next(val);
  }

  setGameData(val: object) {
    this.gameData = val;
  }

  getGameData() {
    return this.gameData;
  }

  getItems(key): Promise<string> {
    return this.storage.get(key);
  }





  async reset() {
   
    this.authenticationState.next(false);

  }


}
