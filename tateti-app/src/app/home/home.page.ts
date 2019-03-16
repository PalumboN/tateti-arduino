import Tateti from '../models/tateti';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  player: String;
  tateti: Tateti;

  constructor() {
    this.restart();
  }

  valueAt(x: number, y: number): String {
    return this.tateti.valueAt(x, y);
  }

  log(x: number, y: number) {
    console.log(this.tateti.board);
    console.log(x, y, this.tateti.valueAt(x, y));
  }

  isUsed(x: number, y: number): Boolean {
    return this.winner() !== undefined || this.valueAt(x, y) !== undefined;
  }

  winner(): String {
    return this.tateti.winner();
  }

  newMove(x: number, y: number) {
    this.tateti.newMove(x, y, this.player);
    console.log('SEND', this.player, '-', (3 * x) + y + 1);
    console.log(this.tateti.board);
    this._changePlayer();
  }

  restart() {
    this.tateti = new Tateti();
    this._changePlayer();
    console.log('SEND', 'R');
  }

  _changePlayer() {
    if (this.player === 'X') {
      this.player = 'O';
    } else {
      this.player = 'X';
    }
  }
}
