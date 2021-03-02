import React, { Component } from 'react';
import instagram from "src/images/instagram.png";
import style from './Header.css';

class Footer extends Component {
    render() {
        return (
            <div id={style.footer}>
                <a href="https://www.instagram.com/tiffanyandcardco/" target="_blank"><img src={instagram}/></a>
            </div>
        );
    }
}

export default Footer;