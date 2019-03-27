import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-match-over',
  templateUrl: './match-over.component.html',
  styleUrls: ['./match-over.component.scss'],
})
export class MatchOverComponent implements OnInit {

  @Input() results: any;

  data: any;

 
  setsplayed: number;
  gamedata: any;

  constructor(private navParams: NavParams, private _modalcontroller: ModalController,
    private _router: Router) { }

  ngOnInit() {
    console.log(`${this.results}`);

    this.gamedata = JSON.parse(this.results);

    this.data = this.navParams.get('data');
    

    this.setsplayed = this.gamedata.current_set;

   
  }

  goHome() {
    this._router.navigateByUrl('/home');
    this._modalcontroller.dismiss();
  }
  
  

}
 