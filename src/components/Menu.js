import React, { Component } from 'react';
import style from './Header.css';

class Menu extends Component {
    render() {
        return (
            <div id={style.menu}>
                <a href="./index.html">HOME</a>
                <a href="./about.html">ABOUT</a>
                <a href="./gallery.html">GALLERY</a>
                {/*<div className={style.dropdown}>*/}
                {/*    <button className={style.dropbtn}>GALLERY</button>*/}
                {/*    <div className={style['dropdown-content']}>*/}
                {/*        <a href="">all</a>*/}
                {/*        <a href="">birthday</a>*/}
                {/*        <a href="">thank you</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={style.dropdown}>
                    <button className={style.dropbtn}>REQUEST</button>
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