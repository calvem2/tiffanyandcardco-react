import React, { Component } from 'react';
import style from "components/Gallery.css";
import {CATEGORIES} from "components/utility";

// Menu to select category of images displayed in Gallery or DesignChooser
class CategorySelector extends Component {
    // props
    // selected: current category selected
    // onChange: function for change to category selected

    handleCategoryChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        let buttons = [];
        let categories = [...CATEGORIES];
        categories.unshift("all");

        for (let i = 0; i < categories.length; i++) {
            buttons.push(
                <label
                    className={this.props.selected === categories[i] ? style.selected : style.unselected}>
                    <input type="radio" value={categories[i]}
                           checked={this.props.selected === categories[i]}
                           onChange={this.handleCategoryChange}/>
                    {categories[i]}
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
