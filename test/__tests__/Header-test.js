jest.dontMock('../../components/parts/Header');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Header = require('../../components/parts/Header').default;

describe('Header', () => {
  it('renders the Header if connected', () => {
    const header = TestUtils.renderIntoDocument(
      <Header title="React Test" status="connected" name="Roger" />
    );
    const title = TestUtils.findRenderedDOMComponentWithTag(header, 'h1');
    expect(ReactDOM.findDOMNode(title).textContent).toBe('React Test');
  });
});
