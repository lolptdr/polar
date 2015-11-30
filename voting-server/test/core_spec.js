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


