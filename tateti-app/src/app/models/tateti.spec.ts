import Tateti from './tateti';

const allPosibleWinners = [
  {
    title: 'horizontal in first row',
    values:
      [
        ['X', 'X', 'X'],
        [],
        []
      ],
  },

  {
    title: 'horizontal in second row',
    values:
      [
        [],
        ['X', 'X', 'X'],
        []
      ],
  },

  {
    title: 'horizontal in third row',
    values:
      [
        [],
        [],
        ['X', 'X', 'X']
      ],
  },

  {
    title: 'vertical in first column',
    values:
      [
        ['X'],
        ['X'],
        ['X']
      ],
  },

  {
    title: 'vertical in second column',
    values:
      [
        [undefined, 'X'],
        [undefined, 'X'],
        [undefined, 'X']
      ],
  },

  {
    title: 'vertical in third column',
    values:
      [
        [undefined, undefined, 'X'],
        [undefined, undefined, 'X'],
        [undefined, undefined, 'X']
      ],
  },

  {
    title: 'diagonal up',
    values:
      [
        [undefined, undefined, 'X'],
        [undefined, 'X'],
        ['X']
      ],
  },

  {
    title: 'diagonal down',
    values:
      [
        ['X'],
        [undefined, 'X'],
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

