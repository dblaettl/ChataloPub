import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});

const getErrorText = (errorData, name) => {
    if (errorData !== null && errorData[name]) {
        return errorData[name];
    } else {
        return null;
    }
};

const FormDialogTextField = (props) => {
    const { classes } = props;
    const fieldType = props.type === undefined ? 'text' : props.type;
    const errorText = getErrorText(props.errorData, props.label);
    return (
        <TextField
            id={props.name}
            label={props.label}
            type={fieldType}
            className={classes.textField}
            value={props.value}
            error={errorText !== null}
            helperText={errorText}
            onChange={props.onChange(props.name)}
            margin="normal"
        />
    );
};

FormDialogTextField.displayName = 'FormDialogTextField';
export default withStyles(styles)(FormDialogTextField);