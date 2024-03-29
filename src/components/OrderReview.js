import React, {Component} from 'react';
import style from "./Form.css";
import customCard from "../images/custom_card.jpg";

class OrderReview extends Component {
    // props:
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, cards)
    // designChoices: choices selected
    // email: initial display value for email input
    // insta: initial display value for Instagram input
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            insta: this.props.insta
        }
    }

    /**
     * Handle change to email input
     */
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
        this.props.handleChange({email: event.target.value});
    };

    /**
     * Handle change to instagram input
     */
    onInstaChange = (event) => {
        this.setState({insta: event.target.value});
        this.props.handleChange({insta: event.target.value});
    };

    /**
     * Render review section for each design selection
     */
    makeSections = () => {
        // return design info for custom card
        if (this.props.formType === "custom") {
            let design = this.props.designChoices["custom"];
            return (
                <div className={style.product}>
                    <img src={customCard}/>
                    <div className={style["product-info"]}>
                        {this.description()}
                        <p>quantity: {design["quantity"]}</p>
                        <p>notes: {design["notes"]}</p>
                    </div>
                </div>
            );
        }

        // create section for each selection
        let selections = this.props.designChoices;
        let sections = [];
        for (let product in selections) {
            sections.push(
                <div className={style.product}>
                    <img src={product}/>
                    <div className={style["product-info"]}>
                        <p>quantity: {selections[product]["quantity"]}</p>
                        <p>notes: {selections[product]["notes"]}</p>
                    </div>
                </div>
            )
        }

        return sections;
    };

    /**
     * Render description for card
     */
    description = () => {
        let design = this.props.designChoices["custom"];
        return (
            <div id={style.description}>
                <p>occasion: {design["occasion"]}</p>
                <p>stamps: {design["stamps"].toString().replace(/,/g, ", ")}</p>
            </div>
        );
    };

    /**
     * Render contact info input (or summary if form has been submitted)
     */
    contactInfo = () => {
        let currentStep = this.props.currentStep;
        let readOnly = currentStep !== 3;
        let emailPlaceholder = currentStep === 3 ? "email@address.com" : "";
        let instaPlaceholder = currentStep === 3 ? "@instagram" : "";
        return (
            <div className={style.contact}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder={emailPlaceholder}
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label htmlFor="insta">Instagram:</label>
                    <input
                        id="insta"
                        name="insta"
                        type="text"
                        placeholder={instaPlaceholder}
                        value={this.state.insta}
                        onChange={this.onInstaChange}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        );
    };

    /**
     * Return short intro message
     */
    greeting = () => {
        if (this.props.currentStep === 3) {
            return "Please review your request and provide your email and/or Instagram below. I'll be in touch shortly for any additional clarifications so I can get started on your cards! Thank you!";
        } else {
            return "Thank you so much for your interest! I'm excited to craft something up for you and I'll be in touch soon!"
        }
    }

    render() {
        if (this.props.currentStep < 3) {
            return null;
        }
        return (
            <div className={style["form-group"]}>
                <div id={style["review-products"]}>
                    {this.makeSections()}
                </div>
                {this.contactInfo()}
            </div>
        );
    }
}

export default OrderReview;