import Tateti from './tateti';

const allPosibleWinners = [
  {
    title: '3 horizontal in first row',
    values:
      [
        ['X', 'X', 'X'],
        [],
        []
      ],
  },

  {
    title: '3 horizontal in second row',
    values:
      [
        [],
        ['X', 'X', 'X'],
        []
      ],
  },

  {
    title: '3 horizontal in third row',
    values:
      [
        [],
        [],
        ['X', 'X', 'X']
      ],
  },

  {
    title: '3 vertical in first column',
    values:
      [
        ['X'],
        ['X'],
        ['X']
      ],
  },

  {
    title: '3 vertical in second column',
    values:
      [
        [undefined, 'X'],
        [undefined, 'X'],
        [undefined, 'X']
      ],
  },

  {
    title: '3 vertical in third column',
    values:
      [
        [undefined, undefined, 'X'],
        [undefined, undefined, 'X'],
        [undefined, undefined, 'X']
      ],
  },
];


describe('Tateti', () => {
  let tateti: Tateti;

  beforeEach(() => {
    tateti = new Tateti();
  });

  describe('at start', () => {
    it('should have no player values', () => {
      expect(tateti.tablero).toEqual([[], [], []]);
    });

    it('should not have a winner', () => {
      expect(tateti.winner()).toBeUndefined();
    });
  });

  describe('should have a winner', () => {

    allPosibleWinners.forEach(({ title, values }) => {

      it('when ' + title, () => {
        tateti.tablero = values;
        expect(tateti.winner()).toEqual('X');
      });

    });

  });
});

