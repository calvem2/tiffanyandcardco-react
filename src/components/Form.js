import React, { Component } from 'react';
import DesignChooser from "./DesignChooser";
import CheckOut from "components/CheckOut";
import style from "./Form.css"
import startImage from "../images/request_start.jpg";
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

class Form extends Component {
    // props
    // formType: form type (inventory, choose from design, start from scratch)

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,                 // current step in the form
            designChoices: new Map(),       // user design selections; id mapped to quantity and notes
            email: ""
        };
    }

    /**
     * Update state with changes to form
     */
    handleChange = (newState) => {
        this.setState(newState);
    };

    /**
     * Validate user input. Returns true if input is valid
     */
    validateInput = () => {
        if (this.state.currentStep === 1) {
            return this.state.designChoices.size !== 0;
        }
        return true;
        // TODO: add validation for other steps
    }

    /**
     * Moves to next page in form
     */
    next = () => {
        let currentStep = this.state.currentStep;
        if (this.validateInput()) {
            currentStep = currentStep >= 2 ? 3 : currentStep + 1;
        }
        this.setState({
            currentStep: currentStep
        });
    };

    /**
     * Moves to previous page of form
     */
    prev = () => {
        let currentStep = this.state.currentStep;
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        this.setState({
            currentStep: currentStep
        });
    };

    /**
     * Renders previous button if there is a previous form section
     */
    previousButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep > 0) {
            let classNames = cx({
                "nav-btn": true,
                disabled: currentStep === 1
            });
            return (
                <button
                    className={classNames}
                    type="button" onClick={this.prev}>
                    Previous
                </button>
            )
        }
        return null;
    };



    /**
     * Renders next button if there is a previous form section
     */
    nextButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep > 0) {
            let classNames = cx({
                "nav-btn": true,
                disabled: !this.validateInput()
            });
            return (
                <button
                    className={classNames}
                    type="button" onClick={this.next}>
                    Next
                </button>
            );
        }
        return null;
    }

    /**
     * Renders title for current step in form
     */
    stepTitle = () => {
        if (this.state.currentStep === 0) {
            return null;
        }
        let header = "step ".concat(this.state.currentStep).concat(": ");
        if (this.state.currentStep === 1) {
            header = header.concat("choose your design(s)")
        } else if (this.state.currentStep === 2) {
            header = header.concat("just a few more details");
        } else if (this.state.currentStep === 3) {
            header = header.concat("contact info");
        } else if (this.state.currentStep === 4) {
            header = header.concat("review");
        }
        return (<h1>{header}</h1>)
    }

    /**
     * Render request start screen
     */
    startScreen = () => {
        if (this.state.currentStep === 0) {
            return (
                <div id={style.start}>
                    <img src={startImage}/>
                    <div id={style["start-info-container"]}>
                        <div id={style["start-info"]}>
                            <h1 id={style["request-header"]}>request</h1>
                            <p>
                                Hello! I'd love to craft something up for you! Cards are $7 each.
                                Tell me a little about your card needs and I'll be in touch!
                            </p>
                            <p id={style["start-button"]} onClick={this.next}>get started</p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
    // TODO: decide what maxSelection is and pass to DesignChooser
        return (
            <form>
                {this.startScreen()}
                {this.stepTitle()}
                <DesignChooser
                    currentStep={this.state.currentStep}
                    formType={this.props.formType}
                    selections={this.state.designChoices}
                    handleChange={this.handleChange}
                />
                <CheckOut
                    currentStep={this.state.currentStep}
                    formType={this.props.formType}

                    selections={this.state.designChoices}
                    handleChange={this.handleChange}
                />
                <div id={style["nav-container"]}>
                    {this.previousButton()}
                    {this.nextButton()}
                </div>
            </form>
        );
    }
}

export default Form;