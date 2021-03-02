import React, { Component } from 'react';
import DesignChooser from "./DesignChooser";
import CheckOut from "components/CheckOut";
import style from "./Form.css"
import classNames from 'classnames/bind';
import OrderReview from "components/OrderReview";
import FormMenu from "components/FormMenu";
import * as emailjs from 'emailjs-com';

const cx = classNames.bind(style);

// Multi page request form
class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formType: "inventory",  // request type (from inventory, existing card, or custom)
            currentStep: 0,         // current step in the form
            designChoices: {},      // user design selections; photo id (or 'custom') mapped to info (quantity, notes, occasion, etc.)
            email: "",              // user email address
            insta: ""               // user instagram handle
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
            if (this.state.formType === "custom") {
                return this.state.designChoices["custom"]["stamps"].length !== 0
            }
            return Object.keys(this.state.designChoices).length !== 0;
        } else if (this.state.currentStep === 3) {
            // validate email
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) ||
                this.state.insta !== "";
        } else if (this.state.currentStep === 2 && this.state.formType === "custom") {
            return this.state.designChoices["custom"]["occasion"] !== "";
        }
        return true;
    };

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
    };

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
    };

    /**
     * Renders title for current step in form
     */
    stepTitle = () => {
        if (this.state.currentStep === 0) {
            return null;
        }
        let header = "step ".concat(this.state.currentStep).concat(": ");
        if (this.state.currentStep === 1) {
            header = this.state.formType === "custom" ? header.concat("choose your stamps(s)") : header.concat("choose your design(s)");
        } else if (this.state.currentStep === 2) {
            header = header.concat("just a few more details");
        } else if (this.state.currentStep === 3) {
            header = header.concat("review");
        } else if (this.state.currentStep === 4) {
            header = "your request has been sent!";
        }
        return (<h1>{header}</h1>)
    };

    /**
     * Render request start screen
     */
    startScreen = () => {
        if (this.state.currentStep === 0) {
            return (
                <div id={style.start}>
                        <div id={style["start-info"]}>
                            <p>
                                Hello! I'd love to craft something up for you.
                                Tell me a little about your card needs and I'll be in touch!
                            </p>
                            <p id={style["start-button"]} onClick={this.next}>get started</p>
                        </div>
                </div>
            );
        }
        return null;
    };

    /**
     * send email with request information
     */
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateInput()) {
            // construct request text
            let requestInfo = "";
            requestInfo += "Selections (" + this.state.formType + "): ";
            for (let product in this.state.designChoices) {
                requestInfo += "url: " + product + ' ';
                requestInfo += "quantity: " + this.state.designChoices[product]["quantity"] + ' ';
                requestInfo += "notes: " + this.state.designChoices[product]["notes"] + ' ';
            }

            // format email from form
            // https://dashboard.emailjs.com/admin
            // https://www.emailjs.com/docs/examples/reactjs/
            // https://www.youtube.com/watch?v=NgWGllOjkbs

            // add request info to form
            let emailParams = event.target;
            let requestInput = document.createElement("input");
            requestInput.name = "message";
            requestInput.type = "text";
            requestInput.value = requestInfo;
            requestInput.style.display = "none";
            emailParams.appendChild(requestInput);

            // send email
            emailjs.sendForm('service_a23txfb', 'template_l9j9x0c', emailParams, 'user_Ru2L3oYAcRnZne1gtva11')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

            // move to submitted page
            this.setState({
                currentStep: 4
            });
        }
    };


    render() {
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