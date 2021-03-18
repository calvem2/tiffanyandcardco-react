import React, {Component} from 'react';
import style from "./Form.css";

const MAX_QUANTITY = 10;

class Quantity extends Component {
    // props:
    // id: id of choice this quantity selector corresponds to
    // quantity: initial display value for quantity selector
    // handleChange: event handler for change to form
    // maxQuantity: max quantity (undefined except for inventory selections)

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.quantity  // selected quantity
        }
    }
    /**
     * Handle change to selector
     */
    onInputChange = (event) => {
        this.setState({value: event.target.value});
        let id = this.props.id;
        this.props.onChange("quantity", id, event.target.value);
    };

    render() {
        const options = [];
        let quantity = this.props.maxQuantity !== undefined ? parseInt(this.props.maxQuantity) : MAX_QUANTITY;
        for (let i = 1; i <= quantity; i++) {
            options.push(<option>{i}</option>)
        }
        return (
            <label className={style.quantity}>
                quantity:
                <select value={this.state.value} onChange={this.onInputChange}>
                    {options}
                </select>
            </label>
        );
    }
}

export default Quantity;