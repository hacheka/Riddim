import Rx from 'rx';
import Cycle from '@cycle/core';
import { div, textarea, p, span, makeDOMDriver } from '@cycle/dom';

function main(sources) {
  
  const separators = /([!:?.;])/;
  const changeArea$ = sources.DOM.select('.source-area').events('input');
  const init$ = Rx.Observable.just([]);
  const areaText$ = changeArea$.map((event) => event.target.value);
  const splitText$ = areaText$.map((text) => text.split('\n').map((line) => {
    const slices = line.split(separators);
    let result = [];
    var i;
    for (i = 0; i < slices.length; i++) {
      if (i + 1 < slices.length && separators.test(slices[i + 1])) {
        result.push(slices[i] + slices[i + 1]);
        i++;
      } else {
        result.push(slices[i])
      }
    }
    return result;
  }));
  
  return {
    DOM: init$.merge(splitText$)
      .map(lines => {
        const paragraphs = lines.map((slice) => {
          return p(slice.map((text, index) => {
            if (index % 2) {
              return span({ style: { 'background-color': 'gray' }}, text);
            } else {
              return span(text);
            }
          }));
        });
        
        return div([
          textarea('.source-area'),
          div(paragraphs)
        ]);
      })
  }
}

const drivers = {
  DOM: makeDOMDriver('.content')
};

Cycle.run(main, drivers);