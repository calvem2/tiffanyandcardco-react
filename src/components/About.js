import React, { Component } from 'react';
import profile from "../images/profile.jpeg";
import style from './About.css';

class About extends Component {
    render() {
        return (
            <div className={style.flex}>
                <div id={style.image}>
                    <img src={profile}/>
                </div>
                <div id={style.info}>
                    <h1 id={style.heading}>hi, i'm tiffany</h1>
                    <p>Thanks for stopping by my card portfolio!</p>
                    <p>I was introduced to the world of card making when I started working at a stamp store in college, and I've been stampin' ever since!</p>
                    <p>I love making cards for birthdays, holidays, and everything in between for my friends and family. Check out my gallery to see what I've made so far!</p>
                </div>
            </div>
        );
    }
}

export default About;