import React, { Component } from 'react';
import style from "components/Gallery.css";

class CategorySelector extends Component {
    // props
    // selected: current category selected
    // onChange: function for change to category selected

    handleCategoryChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        let buttons = [];

        for (let i = 0; i < this.props.categories.length; i++) {
            buttons.push(
                <label
                    className={this.props.selected === this.props.categories[i] ? style.selected : style.unselected}>
                    <input type="radio" value={this.props.categories[i]}
                           checked={this.props.selected === this.props.categories[i]}
                           onChange={this.handleCategoryChange}/>
                    {this.props.categories[i].replace(/_/g, " ")}
                </label>
            );
            buttons.push(
                <br/>
            )
        }
        return (
            <div id={style['category-selector']}>
                {buttons}
            </div>
        );
    }
}

export default CategorySelector;
