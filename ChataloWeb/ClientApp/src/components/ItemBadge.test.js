import React from 'react';
import ItemBadge from './ItemBadge';
import { RemoveRedEye } from '@material-ui/icons';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<ItemBadge icon={<RemoveRedEye/>} text='Foogle'/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});