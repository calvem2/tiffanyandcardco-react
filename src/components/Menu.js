import React, { Component } from 'react';
import classNames from 'classnames/bind';
import style from './Header.css';

const cx = classNames.bind(style);
class Menu extends Component {
    // props
    // selected: menu item currently selected

    render() {
        return (
            <div id={style.menu}>
                <a href="./index.html"
                   className={this.props.selected === "home" ? style.selected : style.unselected}>
                    HOME
                </a>
                <a href="./about.html"
                   className={this.props.selected === "about" ? style.selected : style.unselected}>
                    ABOUT
                </a>
                <a href="./gallery.html"
                   className={this.props.selected === "gallery" ? style.selected : style.unselected}>
                    GALLERY
                </a>
                <a href="./request.html"
                   className={this.props.selected === "request" ? style.selected : style.unselected}>
                    REQUEST
                </a>
            </div>
    );
    }
}

export default Menu;