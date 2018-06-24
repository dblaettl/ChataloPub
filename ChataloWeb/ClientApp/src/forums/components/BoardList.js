import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ForumBreadCrumb from './ForumBreadCrumb';
import BoardListItem from './BoardListItem';
import BoardDialog from './BoardDialog';

const styles = theme => ({

});


const BoardList = (props) => {
    return (
        <div>
            <BoardDialog addBoard={props.addBoard} />
            <ForumBreadCrumb />
            {props.boards.byId.map((item, index) => <BoardListItem key={item} board={props.boards.byHash[item]} />)}
        </div>
    );
};


BoardList.displayName = 'BoardList';
export default withStyles(styles)(BoardList);
