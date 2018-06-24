import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CategoryListItem from './CategoryListItem';
import ForumBreadCrumb from './ForumBreadCrumb';
import CategoryDialog from './CategoryDialog';

const styles = theme => ({

});

const CategoryList = (props) => {
    return (
        <div>
            <CategoryDialog
                addCategory={props.addCategory}
                boardId={props.board.boardId}
            />
            <ForumBreadCrumb boardId={props.board.boardId} />
            {props.board.categories
                && props.board.categories.map((item, index) =>
                    <CategoryListItem
                        key={item}
                        category={props.categories.byHash[item]}
                    />
                )
            }
        </div>
    );
};

CategoryList.displayName = 'CategoryList';
export default withStyles(styles)(CategoryList);
