import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PostDetail from './PostDetail';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { DialogContent } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';

const styles = theme => ({
    chipDiv: {
        padding: 6
    },
    button: {
        float: 'right' 
    },
    actionPanel: {
        overflow: 'hidden'
    },
    floating: {
        float: 'right',
        marginBottom: theme.spacing.unit
    },
    container: {
        padding: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});



class DiscussionPosts extends Component {
    componentWillMount() {
        this.setState({ showDialog: false, message: '' });
        if (this.props.discussion.posts === undefined) {
            this.props.getPostsForDiscussion(this.props.discussion.discussionId);
        }
    }

    componentWillReceiveProps(nextProps) {
 
    }

    showDialog = event => {
        this.setState({ showDialog: true, message: '' });
    };

    hideDialog = event => {
        this.setState({ showDialog: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handlePost = event => {
        var post = {
            discussionId: this.props.discussion.discussionId,
            message: this.state.message
        };
        this.props.addPost(post);
        this.setState({ showDialog: false });
    };

    render() {
        const { classes, posts, discussion, persons } = this.props;
        
        return (
            <Card>
                <CardHeader title={discussion.title} />
                <CardContent>
                    <PostDetail message={discussion.message} date={discussion.dateCreated} index={-1} person={persons.byHash[discussion.createdByPersonId]} />
                    {discussion.posts !== undefined  
                        && discussion.posts.map((p, index) => {
                        let post = posts.byHash[p];
                        return <PostDetail key={p} message={post.message} date={post.dateCreated} index={index} person={persons.byHash[post.createdByPersonId]} />;
                        })
                         
                    }
                    <Button variant="fab" mini color="primary" aria-label="add" className={classes.floating} onClick={this.showDialog}>
                        <Add />
                    </Button>
                </CardContent>
                <Dialog open={this.state.showDialog} onClose={this.hideDialog}>
                    <DialogTitle style={{ width: 500 }}>
                        Add Post
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    className={classes.textField}
                                    value={this.state.message}
                                    onChange={this.handleChange('message')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="post" onClick={this.handlePost}>Post</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

DiscussionPosts.displayName = 'DiscussionPosts';
export default withStyles(styles)(DiscussionPosts);
