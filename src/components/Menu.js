import React, { Component } from 'react';
import style from './Header.css';

class Menu extends Component {
    render() {
        return (
            <div id={style.menu}>
                <a href="./index.html"
                   style={this.props.selected === "home" ? {color: '#ACD9C6'} : {color: 'black'}}>
                    HOME
                </a>
                <a href="./about.html"
                   style={this.props.selected === "about" ? {color: '#ACD9C6'} : {color: 'black'}}>
                    ABOUT
                </a>
                <a href="./gallery.html"
                   style={this.props.selected === "gallery" ? {color: '#ACD9C6'} : {color: 'black'}}>
                    GALLERY
                </a>
                {/*<div className={style.dropdown}>*/}
                {/*    <button className={style.dropbtn}>GALLERY</button>*/}
                {/*    <div className={style['dropdown-content']}>*/}
                {/*        <a href="">all</a>*/}
                {/*        <a href="">birthday</a>*/}
                {/*        <a href="">thank you</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={style.dropdown}>
                    <button className={style.dropbtn}
                            style={this.props.selected === "request" ? {color: '#ACD9C6'} : {color: 'black'}}>
                        REQUEST
                    </button>
                    <div className={style['dropdown-content']}>
                        <a href="">choose existing design</a>
                        <a href="">start from scratch</a>
                    </div>
                </div>
            </div>
    );
    }
}

export default Menu;