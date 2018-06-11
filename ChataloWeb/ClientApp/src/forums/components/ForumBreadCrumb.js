import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const styles = theme => ({
    breadcrumb: {
        marginLeft: -40,
        '& ul': {
            listStyle: 'none',
            display: 'inline-table'
        },
        '& ul li': {
            display: 'inline'
        },
        '& ul li a': {
            display: 'block',
            float: 'left',
            height: 40,
            background: theme.palette.secondary.main,
            textAlign: 'center',
            padding: '10px 10px 0 30px',
            position: 'relative',
            margin: '0 10px 0 0',
            fontSize: 20,
            textDecoration: 'none',
            color: 'white'
        },
        '& ul li a:after': {
            content: 'no-open-quote',
            borderTop: '20px solid transparent',
            borderBottom: '20px solid transparent',
            borderLeft: '20px solid',
            borderLeftColor: theme.palette.secondary.main,
            position: 'absolute',
            right: -20,
            top: 0,
            zIndex: 1
        },
        '& ul li a:before': {
            content: 'no-open-quote',
            borderTop: '20px solid transparent',
            borderBottom: '20px solid transparent',
            borderLeft: '20px solid #fff',
            position: 'absolute',
            left: 0,
            top: 0
        },
        '& ul li:first-child a': {
            borderTopLeftRadius: 10,
            paddingLeft: 20,
            borderBottomLeftRadius: 10
        },
        '& ul li:first-child a:before': {
            display: 'none'
        },
        '& ul li:last-child a': {
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            paddingRight: 20,
            pointerEvents: 'none'
        },
        '& ul li:last-child a:after': {
            display: 'none'
        },
        '& ul li:not(:last-child) a:hover': {
            background: theme.palette.primary.main
        },
        '& ul li a:hover:after': {
            borderLeftColor: theme.palette.primary.main
        }
    }
});


const DiscussionBreadCrumb = (props) => {
    const { classes } = props;

    return (
        <div className={classes.breadcrumb}> 
            <ul>
                <li><Link to='/forums' className={classes.link} >Top</Link></li>
                {props.board !== undefined && props.board !== null && <li><Link to={`/forums/${props.board.boardId}`} className={classes.link} >{props.board.name}</Link></li>}
                {props.category !== undefined && props.category !== null && <li><Link to={`/forums/${props.board.boardId}/categories/${props.category.boardCategoryId}`} className={classes.link}>{props.category.name}</Link></li>}     
                {props.discussion !== undefined && props.discussion !== null && <li><a href='never'>Discussion</a></li>}     
            </ul>
        </div>
    );
};
DiscussionBreadCrumb.displayName = 'DiscussionBreadCrumb';
export default withStyles(styles)(DiscussionBreadCrumb);
