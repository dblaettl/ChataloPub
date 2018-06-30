import React from 'react';
import FormattedDate from './FormattedDate';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<FormattedDate date='2017-05-22' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});