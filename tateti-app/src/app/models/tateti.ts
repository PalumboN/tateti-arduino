import * as _ from 'lodash';

export default class Tateti {
  tablero: String[][];

  constructor() {
    this.tablero = [[], [], []];
  }

  get tableroInvertido() {
    return _.zip(...this.tablero);
  }

  newMove(x: number, y: number, player: String) {
    this.tablero[y][x] = player;
  }

  valueAt(x: number, y: number) {
    return this.tablero[y][x];
  }

  winner(): String {
    return this._hWinner(this.tablero) || this._hWinner(this.tableroInvertido);
  }

  _hWinner(tablero: String[][]): String {
    return _(tablero)
      .map((row) => _.countBy(row))
      .map(_.invert)
      .map('3')
      .without('undefined')
      .compact()
      .head();
  }
}
