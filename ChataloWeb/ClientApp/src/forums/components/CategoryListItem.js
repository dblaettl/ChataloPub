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
    content: {
 
    },
    link: {
        textDecoration: 'none'
    }
});


const CategoryListItem = (props) => {
    const { classes } = props;
    return (
        <Link to={`/forums/${props.category.boardId}/categories/${props.category.boardCategoryId}`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="headline">{props.category.name}</Typography>
                    <Typography variant="subheading">{props.category.description}</Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

CategoryListItem.displayName = 'CategoryListItem';
export default withStyles(styles)(CategoryListItem);
