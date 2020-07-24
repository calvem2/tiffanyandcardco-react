import React, { Component } from 'react';
import Menu from "./Menu";
import style from './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <a id={style.logo} href={"./index.html"}>
                    <div>Tiffany & Card Co.</div>
                </a>
                <Menu/>
            </div>
        );
    }
}

export default Header;