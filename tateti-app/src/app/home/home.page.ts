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

  isUsed(x, y) {
    return this.tateti.valueAt(x, y) !== undefined;
  }

  newMove(x, y) {
    this.tateti.newMove(x, y, this.player);
    console.log('SEND', this.player, '-', (3 * x) + y + 1);
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
