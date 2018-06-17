import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ForumBreadCrumb from './ForumBreadCrumb';
import BoardListItem from './BoardListItem';
import BoardDialog from './BoardDialog';

const styles = theme => ({

});


class CategoryList extends Component {
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
 
    }

    render() {
        return (
            <div>
                <BoardDialog addBoard={this.props.addBoard} />
                <ForumBreadCrumb />
                {this.props.boards.byId.map((item, index) => <BoardListItem key={item} board={this.props.boards.byHash[item]} />)}
            </div>
        );
    }
}


CategoryList.displayName = 'CategoryList';
export default withStyles(styles)(CategoryList);
