import React, {Component} from 'react';
import style from "./Form.css";

class Notes extends Component {
    // props:
    // id: id of choice this note input corresponds to
    // note: initial display value for notes input
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.note
        }
    }

    /**
     * Handle change to note input
     */
    onInputChange = (event) => {
        this.setState({value: event.target.value});
        let id = this.props.id;
        this.props.onChange("notes", id, event.target.value);
    }

    render() {
        return (
            <label>
                <textarea
                    value={this.state.value}
                    onChange={this.onInputChange}
                    placeholder="additional notes..."
                />
            </label>
        );
    }
}

export default Notes;