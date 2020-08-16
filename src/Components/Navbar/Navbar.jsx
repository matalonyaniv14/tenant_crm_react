import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
    useLocation
  } from "react-router-dom";


import style from './style.module.css';
import { useState } from 'react';
import { useEffect } from 'react';



const burgerIcon = <FontAwesomeIcon icon={faBars} />
const timesIcon  = <FontAwesomeIcon icon={faTimes} />

const Navbar = () => {
    const [ active, setActive ] = useState(false);
    const { pathname } = useLocation();

    const handleClick = () => {
        setActive( !active );
    }

    useEffect(() => {
        setActive( false );
    }, [ pathname ])


    if ( active ) {
        return (
            <div className={ cx( style.nav ,style.activeWrap) } >
                <div onClick={ handleClick } className={ style.icon }>
                    { timesIcon }
                </div>
                    <div className={ style.activeMenu }>
                        <ul>
                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            <li>Add tenant</li>
                            <li>Who Owes Me Money?</li>
                        </ul>
                    </div>
            </div>
        )
    }

    return (
        <div className={ cx(style.nav, style.wrap) } >
            <div onClick={ handleClick }
                 className={ style.icon }>
                { burgerIcon }
            </div>
        </div>
    )
}

export default Navbar;