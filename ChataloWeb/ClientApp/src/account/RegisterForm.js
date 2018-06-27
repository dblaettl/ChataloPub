import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Account';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormDialogTextField from '../components/FormDialogTextField';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ErrorSummary from '../components/ErrorSummary';


const styles = theme => ({
    container: {
        padding: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap'
    }
});

/*
 * Components are where the display elements are, no store references should ever be here
 */

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstName: '', lastName: '', city: '', state:'', tabValue: 0 };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    handleRegister = (event) => {
        let user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            state: this.state.state
        };
        this.props.register(user);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (

            <Card>
                <CardHeader title='Register' action={<Button component={Link} color='primary' to='/account/login'>Login</Button>} />
                <CardContent>
                    <ErrorSummary errorData={this.props.errorData} />
                    <form className={classes.container} noValidate autoComplete="off">
                        <div>
                            <FormDialogTextField name="email" label="Email" value={this.state.email} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="password" type='password' label="Password" value={this.state.password} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="firstName" label="FirstName" value={this.state.firstName} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="lastName" label="LastName" value={this.state.lastName} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="city" label="City" value={this.state.city} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="state" label="State" value={this.state.state} errorData={this.props.errorData} onChange={this.handleChange} />
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <Button color='secondary'>Cancel</Button>
                    <Button onClick={this.handleRegister} color='primary'>Register</Button>
                </CardActions>
            </Card>
        );
    }
}

RegisterForm.displayName = 'RegisterForm';
export default connect(
    state => state.account,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(RegisterForm));