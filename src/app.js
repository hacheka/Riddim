import Rx from 'rx';
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';

function main() {
  return {
    DOM: Rx.Observable.interval(1000)
      .map(i => CycleDOM.p('' + i + ' seconds elapsed'))
  };
}

function mierda() {}

const drivers = {
  DOM: CycleDOM.makeDOMDriver('.content')
};

Cycle.run(main, drivers);