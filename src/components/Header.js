import React, { Component } from 'react';
import Menu from "./Menu";
import style from './Header.css';

class Header extends Component {
    // props
    // menuValue: selected menu item

    render() {
        return (
            <div id={style.header}>
                <a id={style.logo} href={"./index.html"}>
                    <div>Tiffany & Card Co.</div>
                </a>
                <Menu selected={this.props.menuValue}/>
            </div>
        );
    }
}

export default Header;