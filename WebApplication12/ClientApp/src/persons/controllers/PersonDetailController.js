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
        if (id !== undefined) {
            this.props.getPerson(id);
        }

    }

    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.id;
        if (id !== undefined) {
            if (this.props.person === null || id !== this.props.person.id) {
                this.props.getPerson(id);
            }
        }
    }

 

    render() {
        return <PersonForm person={this.props.match.params.id !== undefined ? this.props.person : null} addPerson={this.props.addPerson} editPerson={this.props.editPerson} deletePerson={this.props.deletePerson} />;
    }
}

PersonDetailController.displayName = 'PersonDetailController';
export default  connect(
    state => state.persons,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PersonDetailController);