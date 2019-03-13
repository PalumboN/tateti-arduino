import * as _ from 'lodash';

export default class Tateti {
  tablero: String[][];

  constructor() {
    this.tablero = [[], [], []];
  }

  get tableroInvertido() {
    return _.zip(...this.tablero);
  }

  get tableroEspejado() {
    return _.reverse(this.tablero);
  }

  newMove(x: number, y: number, player: String) {
    this.tablero[y][x] = player;
  }

  valueAt(x: number, y: number) {
    return this.tablero[y][x];
  }

  winner(): String {
    return this._horizontalWinner(this.tablero) ||
      this._horizontalWinner(this.tableroInvertido) ||
      this._diagonalDownWinner(this.tablero) ||
      this._diagonalDownWinner(this.tableroEspejado);
  }

  _horizontalWinner(tablero: String[][]): String {
    return _(tablero)
      .map((row) => _.countBy(row))
      .map(_.invert)
      .map('3')
      .without('undefined')
      .compact()
      .head();
  }

  _diagonalDownWinner(tablero: String[][]): String {
    const diagonal = _.map(tablero, (row, i) => _.get(row, i));
    return this._horizontalWinner([diagonal]);
  }
}
