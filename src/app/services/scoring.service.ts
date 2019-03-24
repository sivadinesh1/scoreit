import { FormGroup } from '@angular/forms';


import { Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ScoringService {


  authenticationState = new Subject();

  online$: Observable<boolean>;

  tempuserauthenticated: any;

  constructor(private storage: Storage, private plt: Platform,
    private toastController: ToastController,
  ) {

    this.plt.ready().then(() => {
      console.log('when calling 1');
      this.storage.set('SINGLES_DOUBLES', 1);
      this.storage.set('SIDES', 'Left');
      this.storage.set('NOOFSETS', 3);
      this.storage.set('DUMMY', '');
      this.storage.set('GAME_POINT', 21);
      this.storage.set('DEUCE_POINT', 30);
      this.storage.set('PLAYER1', 'Player1');
      this.storage.set('PLAYER2', 'Player2');
      this.storage.set('PLAYER3', 'Player3');
      this.storage.set('PLAYER4', 'Player4');
      this.storage.set('IS_DEUCE_RULE', true);
    });
  }

  getItems(key): Promise<string> {
    return this.storage.get(key);
  }


  async gameSettings(submitForm: FormGroup) {
    await this.storage.set('SINGLES_DOUBLES', submitForm.value.singlesordoubles);
    await this.storage.set('SIDES', submitForm.value.sides);
    await this.storage.set('NOOFSETS', submitForm.value.noofsets);
    await this.storage.set('DUMMY', submitForm.value.dummy);
    await this.storage.set('GAME_POINT', submitForm.value.gamepoint);
    await this.storage.set('DEUCE_POINT', submitForm.value.deucepoint);
    await this.storage.set('PLAYER1', submitForm.value.player1);
    await this.storage.set('PLAYER2', submitForm.value.player2);
    await this.storage.set('PLAYER3', submitForm.value.player3);
    await this.storage.set('PLAYER4', submitForm.value.player4);
    await this.storage.set('IS_DEUCE_RULE', submitForm.value.isdeucerule);

    console.log('inside login notify');
  }


  async reset() {
    await this.storage.remove('SINGLES_DOUBLES');
    await this.storage.remove('SIDES');
    await this.storage.remove('NOOFSETS');
    await this.storage.remove('DUMMY');
    await this.storage.remove('GAME_POINT');
    await this.storage.remove('DEUCE_POINT');
    await this.storage.remove('PLAYER1');
    await this.storage.remove('PLAYER2');
    await this.storage.remove('PLAYER3');
    await this.storage.remove('PLAYER4');
    await this.storage.remove('PLAYER4');
    await this.storage.remove('IS_DEUCE_RULE');

    this.authenticationState.next(false);

  }


}
