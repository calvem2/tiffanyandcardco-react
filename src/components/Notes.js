import React, {Component} from 'react';
import style from "./Form.css";

class Notes extends Component {
    // props:
    // id: id of choice this note input corresponds to
    // note: initial display value for notes input
    // formType: type of form (inventory, custom, cards)
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.note  // display value for notes input
        }
    }

    /**
     * Handle change to note input
     */
    onInputChange = (event) => {
        this.setState({value: event.target.value});
        let id = this.props.id;
        this.props.onChange("notes", id, event.target.value);
    };

    render() {
        let placeholder;
        if (this.props.formType === "cards") {
            placeholder = "color preferences, tweaks, special instructions, etc.";
        } else if (this.props.formType === "inventory") {
            placeholder = "additional notes...";
        } else {
            placeholder = "color, preferences, special instructions, additional notes, etc."
        }
        return (
            <label>
                <textarea
                    value={this.state.value}
                    onChange={this.onInputChange}
                    placeholder={placeholder}
                />
            </label>
        );
    }
}

export default Notes;