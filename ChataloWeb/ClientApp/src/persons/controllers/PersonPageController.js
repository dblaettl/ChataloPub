import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Persons';
import PersonTable from '../components/PersonTable';
import PersonPager from '../components/PersonPager';


/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class PersonPageController extends Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        const offset = parseInt(this.props.match.params.offset, 10) || 0;
        const limit = parseInt(this.props.match.params.limit, 10) || 0;
        this.props.pagePersons(offset,limit);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        const offset = parseInt(nextProps.match.params.offset, 10) || 0;
        const limit = parseInt(nextProps.match.params.limit, 10) || 0;
        this.props.pagePersons(offset, limit);
    }

    render() {
        return (
            <div>
                <PersonTable persons={this.props.persons} isLoading={this.props.isLoading} />
                <PersonPager offset={this.props.offset} />
            </div>
        );
    }
}
 
PersonPageController.displayName = 'PersonPageController';
export default connect(
    state => state.persons,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PersonPageController);
