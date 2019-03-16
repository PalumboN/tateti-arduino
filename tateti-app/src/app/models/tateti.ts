import * as _ from 'lodash';

export default class Tateti {
  board: String[][];

  constructor() {
    this.board = [[], [], []];
  }

  get tableroInvertido() {
    return _.zip(...this.board);
  }

  get tableroEspejado() {
    return _.reverse(this.board);
  }

  newMove(x: number, y: number, player: String) {
    _.set(this.board, `${y}.${x}`, player);
  }

  valueAt(x: number, y: number) {
    return this.board[y][x];
  }

  winner(): String {
    return this._horizontalWinner(this.board) ||
      this._horizontalWinner(this.tableroInvertido) ||
      this._diagonalDownWinner(this.board) ||
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
