import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Titanic', 'Love Actually');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Titanic', 'Love Actually')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Titanic', 'Love Actually'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Titanic', 'Love Actually')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('The Butler', 'The Duff', 'Fight Club')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('The Butler', 'The Duff')
        }),
        entries: List.of('Fight Club')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('The Green Mile', 'Final Fantasy'),
          tally: Map({
            'The Green Mile': 4,
            'Final Fantasy': 2
          })
        }),
        entries: List.of('Memento', '12 Monkeys', 'Oldboy')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Memento', '12 Monkeys')
        }),
        entries: List.of('Oldboy', 'The Green Mile')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Memento', 'Primer'),
          tally: Map({
            'Memento': 3,
            'Primer': 3
          })
        }),
        entries: List.of('Moon', 'Solaris', 'Slumdog Millionaire')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Moon', 'Solaris')
        }),
        entries: List.of('Slumdog Millionaire', 'Memento', 'Primer')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('2046', 'U-turn'),
          tally: Map({
            '2046': 4,
            'U-turn': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: '2046'
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Goodfellas', 'Legally Blonde')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Goodfellas');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Goodfellas', 'Legally Blonde'),
          tally: Map({
            'Goodfellas': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Goodfellas', 'Legally Blonde'),
          tally: Map({
            'Goodfellas': 3,
            'Legally Blonde': 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, 'Goodfellas');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Goodfellas', 'Legally Blonde'),
          tally: Map({
            'Goodfellas': 4,
            'Legally Blonde': 2
          })
        }),
        entries: List()
      }));
    });

  });


});


