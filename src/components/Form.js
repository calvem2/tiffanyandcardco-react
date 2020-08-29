import React, { Component } from 'react';
import DesignChooser from "./DesignChooser";
import CheckOut from "components/CheckOut";
import style from "./Form.css"
import startImage from "../images/request_start.jpg";
import classNames from 'classnames/bind';
import OrderReview from "components/OrderReview";
import FormMenu from "components/FormMenu";

const cx = classNames.bind(style);

class Form extends Component {
    // TODO: get rid of this prop everywhere
    // props
    // formType: form type (inventory, choose from design, start from scratch)

    // props:
    // products:

    constructor(props) {
        super(props);
        this.state = {
            formType: "inventory",
            currentStep: 0,                 // current step in the form
            designChoices: {},              // user design selections; id mapped to quantity and notes
            email: "",                      // user email address
            insta: ""                       // user instagram handle
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
            //TODO: add validation for custom step one
            if (this.state.formType === "custom") {
                return this.state.designChoices["custom"]["stamps"].length !== 0 &&
                       this.state.designChoices["custom"]["colors"].length !== 0;
            }
            return Object.keys(this.state.designChoices).length !== 0;
        } else if (this.state.currentStep === 3) {
            return this.state.email !== "" || this.state.insta !== "";
        }
        return true;
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
        if (currentStep > 0 && currentStep < 4) {
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
     * Renders next button if there is a next form section
     */
    nextButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep > 0 && currentStep < 4) {
            let classNames = cx({
                "nav-btn": true,
                disabled: !this.validateInput() || currentStep === 3
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
            header = header.concat("review");
        } else if (this.state.currentStep === 4) {
            header = "your request has been sent!";
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

    /**
     * send email with request information
     */
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateInput()) {
            // construct request text
            let requestInfo = "";
            requestInfo += "Email: " + this.state.email + '\n';
            requestInfo += "Instagram: " + this.state.insta + '\n';
            requestInfo += "Selections: " + '\n';
            for (let product in this.state.designChoices) {
                requestInfo += "url: " + product + '\n';
                requestInfo += "quantity: " + this.state.designChoices[product]["quantity"] + '\n';
                requestInfo += "notes: " + this.state.designChoices[product]["notes"] + '\n\n';
            }

            // send request email

            // move to submitted page
            this.setState({
                currentStep: 4
            });
        }
    }
    /**
     * Render submit button
     */
    submitButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 3) {
            let classNames = cx({
                "submit": true,
                disabled: !this.validateInput()
            });
            return (
                <button className={classNames}>submit</button>
            );
        }
        return null;
    }

    render() {
    // TODO: decide what maxSelection is and pass to DesignChooser
        return (
            <form onSubmit={this.handleSubmit}>
                {this.startScreen()}

                {this.state.currentStep === 1 &&
                <FormMenu
                    formType={this.state.formType}
                    handleChange={this.handleChange}
                />
                }

                {this.stepTitle()}

                <DesignChooser
                    currentStep={this.state.currentStep}
                    formType={this.state.formType}
                    designChoices={this.state.designChoices}
                    handleChange={this.handleChange}
                />
                <CheckOut
                    currentStep={this.state.currentStep}
                    formType={this.state.formType}
                    designChoices={this.state.designChoices}
                    handleChange={this.handleChange}
                />
                <OrderReview
                    currentStep={this.state.currentStep}
                    formType={this.state.formType}
                    designChoices={this.state.designChoices}
                    email={this.state.email}
                    insta={this.state.insta}
                    handleChange={this.handleChange}
                />
                {this.submitButton()}
                <div id={style["nav-container"]}>
                    {this.previousButton()}
                    {this.nextButton()}
                </div>
            </form>
        );
    }
}

export default Form;