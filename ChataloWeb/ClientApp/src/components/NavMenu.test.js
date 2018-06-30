import React from 'react';
import NavMenu from './NavMenu';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'  

it('renders correctly', () => {
    const tree = renderer
        .create(<Router><NavMenu /></Router>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});