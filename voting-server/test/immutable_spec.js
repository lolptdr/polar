import {List} from 'immutable';
import {expect} from 'chai';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('a list', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    // function addMovie(currentState, movie) {
    //   return currentState.update('movies', movies => movies.push(movie))
    // }

    it('is immutable', () => {
      let state = List.of('Pulp Fiction', 'The Matrix');
      let nextState = addMovie(state, 'Casino');

      expect(nextState).to.equal(List.of(
        'Pulp Fiction',
        'The Matrix',
        'Casino'
      ));
      expect(state).to.equal(List.of(
        'Pulp Fiction',
        'The Matrix'
      ));

    });

  });

});
