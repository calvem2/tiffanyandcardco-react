import React, {Component} from 'react';
import style from "./Form.css";


class Occasion extends Component {
    // props:
    // id: id of choice this quantity selector corresponds to
    // occasion: initial display value for occasion selector
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.occasion
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
        const categories = ["", "birthday", "congratulations", "get well", "graduation", "greeting", "holiday", "retirement", "thank you", "wedding", "other (specify in notes section)"];
        const options = [];
        for (let i = 0; i < categories.length; i++) {
            options.push(<option>{categories[i]}</option>)
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