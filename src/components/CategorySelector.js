import React, { Component } from 'react';

// interface CategorySelectorProps {
//     selected: string;                       // selected category
//     onChange(newCategory: string): void;    // called when new category chosen
// }

class CategorySelector extends Component {

    handleCategoryChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        let buttons = [];

        for (let i = 0; i < this.props.categories.length; i++) {
            buttons.push(
                <label>
                    <input type="radio" value={this.props.categories[i]}
                           checked={this.props.selected === this.props.categories[i]}
                           onChange={this.handleCategoryChange}/>
                    {this.props.categories[i].replace(/_/g, " ")}
                </label>
            )
            buttons.push(
                <br/>
            )
        }
        return (
            <div>
                {buttons}
            </div>
        );
    }
}

export default CategorySelector;
