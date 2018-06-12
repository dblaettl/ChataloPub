﻿import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CategoryListItem from './CategoryListItem';
import ForumBreadCrumb from './ForumBreadCrumb';
import CategoryDialog from './CategoryDialog';

const styles = theme => ({

});


class CategoryList extends Component {
    componentWillMount() {
        if (this.props.board.categories === undefined) {
            this.props.getCategoriesForBoard(this.props.board.boardId);
        }
    }

    componentWillReceiveProps(nextProps) {
 
    }

    render() {
        return (
            <div>
                <CategoryDialog
                    addCategory={this.props.addCategory}
                    boardId={this.props.board.boardId}
                    showDialog={this.props.showDialog}
                    setShowDialog={this.props.setShowDialog}
                    errorData={this.props.errorData}
                />
                <ForumBreadCrumb boardId={this.props.board.boardId} />
                {this.props.board.categories !== undefined
                    && this.props.board.categories.map((item, index) =>
                    <CategoryListItem
                        key={item}
                        category={this.props.categories.byHash[item]}
                    />
                    )
                }
               
            </div>
        );
    }
}


CategoryList.displayName = 'CategoryList';
export default withStyles(styles)(CategoryList);
