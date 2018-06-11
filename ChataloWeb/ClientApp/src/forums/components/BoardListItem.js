import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
       
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    text: {
        textDecoration: 'none',
        flex: 1,
        margin: theme.spacing.unit
    },
    content: {
 
    },
    link: {
        textDecoration: 'none'
    }
});


const BoardListItem = (props) => {
    const { classes } = props;
    return (
        <Link to={`/forums/${props.board.boardId}`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                        <Typography variant="headline">{props.board.name}</Typography>
                        <Typography variant="subheading">{props.board.description}</Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

BoardListItem.displayName = 'BoardListItem';
export default withStyles(styles)(BoardListItem);
