import React, {Component} from 'react';
import style from "./Form.css";
import {CATEGORIES} from "components/utility";


class Occasion extends Component {
    // props:
    // id: id of choice this quantity selector corresponds to
    // occasion: initial display value for occasion selector
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.occasion  // selected value
        }
    }
    /**
     * Handle change to selector
     */
    onInputChange = (event) => {
        this.setState({value: event.target.value});
        let id = this.props.id;
        this.props.onChange("occasion", id, event.target.value);
    };

    render() {
        const options = [<option></option>];
        for (let i = 0; i < CATEGORIES.length; i++) {
            options.push(<option>{CATEGORIES[i]}</option>)
        }
        return (
            <label className={style.occasion}>
                occasion:
                <select value={this.state.value} onChange={this.onInputChange}>
                    {options}
                </select>
            </label>
        );
    }
}

export default Occasion;