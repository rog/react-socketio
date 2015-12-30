jest.dontMock('../../components/parts/Questions');
jest.dontMock('../../api/questions');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Questions = require('../../components/parts/Questions').default;

describe('<Questions />', () => {
  const qs = require('../../api/questions');
  it('Renders the Questions', () => {
    const questionsRender = TestUtils.renderIntoDocument(
      <Questions questions={qs} />
    );
    const spans = TestUtils.scryRenderedDOMComponentsWithTag(questionsRender, 'span');
    expect(ReactDOM.findDOMNode(spans[0]).textContent).toBe('Sci-Fi Author Ernest Cline Loaned His DeLorean To Fantasy Author George Martin In Exchange For?');
    expect(ReactDOM.findDOMNode(spans[1]).textContent).toBe('Your Favourite Beatle is');
    expect(ReactDOM.findDOMNode(spans[2]).textContent).toBe('Which Color is Your Lightsaber?');
    expect(ReactDOM.findDOMNode(spans[3]).textContent).toBe('Which Starter Pokémon Should You Choose');
    expect(ReactDOM.findDOMNode(spans[4]).textContent).toBe('Select The Only Band That Matters');
  });
});
