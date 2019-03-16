import { Component } from '@angular/core';


@Component({
  selector: 'board-cell',
  templateUrl: 'board.cell.html',
  // styleUrls: ['home.page.scss'],
})
export class BoardCell {
  toggle: Boolean;

  constructor() {
    this.toggle = false;
  }

}
