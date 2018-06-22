import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Persons';
import PersonForm from '../components/PersonForm';

/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class PersonDetailController extends Component {
    componentWillMount() {
        let id = this.props.match.params.id;
        if (id) {
            this.props.getPerson(id);
        }

    }

    componentWillReceiveProps(nextProps) {
 
    }

 

    render() {
        return <PersonForm person={this.props.match.params.id ? this.props.person : null} addPerson={this.props.addPerson} editPerson={this.props.editPerson} deletePerson={this.props.deletePerson} />;
    }
}

PersonDetailController.displayName = 'PersonDetailController';
export default  connect(
    state => state.persons,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PersonDetailController);