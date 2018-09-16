import React, { Component, Fragment } from "react";
import Link from 'next/link'

export default class Navbar extends Component{
    onClick(e){
        if(e) e.preventDefault()
        this.menu.classList.toggle('animate')
        this.nav.classList.toggle('--open')
    }
    render(){
        const {series} = this.props
        return <Fragment>
            <div className="navbar" ref={nav => this.nav = nav}>  
                <div className="navbar__bg">
                </div>
                <ul>
                    <li> 
                        <Link href={`/`} key={0}>
                            <a>Home</a>
                        </Link>
                    </li>
                    {series && series.map(s => <li key={s._id}> 
                        <Link href={`/serie/${s.slug}`}>
                            <a>{s.name} </a>
                        </Link>
                    </li>)}
                </ul>
            </div>
            <div className="menuwrapper" onClick={this.onClick.bind(this)} >
                <div ref={menu => this.menu = menu} className="menuwrapper-hamburger" />
            </div>
        </Fragment>
    }
}