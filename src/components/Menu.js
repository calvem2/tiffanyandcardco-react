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
                {/*<div className={style.dropdown}>*/}
                {/*    <button className={cx({*/}
                {/*                        dropbtn: true,*/}
                {/*                        selected: this.props.selected.includes("request"),*/}
                {/*                        unselected: !this.props.selected.includes("request")})}>*/}
                {/*        REQUEST*/}
                {/*    </button>*/}
                {/*    <div className={style['dropdown-content']}>*/}
                {/*        <a className={this.props.selected.includes("inventory") ? style.selected : style.unselected}*/}
                {/*           href="./inventory.html">inventory</a>*/}
                {/*        <a className={this.props.selected.includes("cards") ? style.selected : style.unselected}*/}
                {/*           href="./cards.html">choose from existing design</a>*/}
                {/*        <a className={this.props.selected.includes("custom") ? style.selected : style.unselected}*/}
                {/*           href="custom.html">start from scratch</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
    );
    }
}

export default Menu;