import React, { Component } from 'react';
import instagram from "src/images/instagram.png";
import style from './Header.css';

class Footer extends Component {
    render() {
        return (
            <div id={style.footer}>
                <a href="https://www.instagram.com/tiffanyandcardco/" target="_blank"><img src={instagram}/></a>
                {/*<div id={style.logo}><a href="./index.html">Tiffany & Card Co.</a></div>*/}
                {/*<div id={style.contact}><a href="mailto:tiffany.cardco@gmail.com">tiffany.cardco@gmail.com</a>.</div>*/}
            </div>
        );
    }
}

export default Footer;