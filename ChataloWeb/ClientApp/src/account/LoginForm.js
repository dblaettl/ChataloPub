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

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: ''  };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    handleLogin = (event) => {
        this.props.login(this.state.email, this.state.password);
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
                <CardHeader title='Login' action={<Button component={Link} color='primary' to='/account/register'>Register</Button>} /> 
                <CardContent>
                    <ErrorSummary errorData={this.props.errorData} />
                    <form className={classes.container} noValidate autoComplete="off">
                        <div>
                            <FormDialogTextField name="email" label="Email" value={this.state.email} errorData={this.props.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="password" type='password' label="Password" value={this.state.password} errorData={this.props.errorData} onChange={this.handleChange} />
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <Button color='secondary'>Cancel</Button>
                    <Button onClick={this.handleLogin} color='primary'>Login</Button>
                </CardActions>
            </Card>
        );
    }
}

LoginForm.displayName = 'LoginForm';


export default connect(
    state => state.account,
    dispatch => bindActionCreators(actionCreators, dispatch)
    )(withStyles(styles)(LoginForm));