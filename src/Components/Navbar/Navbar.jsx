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
import { formatPathName } from '../../Utils/utils';



const burgerIcon = <FontAwesomeIcon icon={faBars} />
const timesIcon  = <FontAwesomeIcon icon={faTimes} />

const Navbar = () => {
    const [ active, setActive ] = useState(false);
    const { pathname } = useLocation();

    const handleClick = () => {
        setActive( !active );
    }

    useEffect(() => {
        console.log(pathname);

        setActive( false );
    }, [ pathname ])


    if ( active ) {
        return (
            <div className={ cx( style.nav ,style.activeWrap) } >
                <div onClick={ handleClick } className={ style.icon }>
                    { timesIcon }
                </div>
                    <div className={ style.activeMenu }>
                        <ul onClick={handleClick}>
                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            <Link to='/tenant/new'>
                                <li>Add tenant</li>
                            </Link>
                            <Link to={ ( l ) => ({ pathname: '/', filter: 'late_payments' }) }>
                                <li>Who Owes Me Money?</li>
                            </Link>
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
            <div className={style.currentPage}>
                <p> { formatPathName( pathname ) }</p>
            </div>
        </div>
    )
}

export default Navbar;