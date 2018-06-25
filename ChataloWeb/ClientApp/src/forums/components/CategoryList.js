import React, { Component } from 'react';
import CategoryListItem from './CategoryListItem';
import CategoryDialog from './CategoryDialog';
 
class CategoryList extends Component {
    componentWillMount() {

        if (this.props.board.categories === undefined) {
            this.props.getCategoriesForBoard(this.props.board.boardId);
        }
    }

    render() {
        return (
            <div>
                <CategoryDialog addCategory={this.props.addCategory}  boardId={this.props.board.boardId} />
                {this.props.board.categories
                    && this.props.board.categories.map((item, index) =>
                        <CategoryListItem key={item} category={this.props.categories.byHash[item]} />
                    )
                }
            </div>
        );
    }
}

CategoryList.displayName = 'CategoryList';
export default CategoryList;
