import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  player: String;
  values: String[][];

  constructor() {
    this.restart();
  }

  isUsed(x, y) {
    return this.valueAt(x, y) !== undefined;
  }

  newMove(x, y) {
    this.values[x][y] = this.player;
    console.log('SEND', this.player, '-', (3 * x) + y + 1);
    this._changePlayer();
  }

  valueAt(x, y) {
    return this.values[x][y];
  }

  restart() {
    this.values = [[], [], []];
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
