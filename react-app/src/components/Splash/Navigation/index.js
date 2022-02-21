import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'

import logo from '../../../img/logo.png'
import './SplashNavigation.css'


function SplashNavigation() {
    const [formValue, setFormValue] = useState('')
    const [show, setShow] = useState(false)
    const history = useHistory()

    const handleMenu = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormValue('')
        history.push('/login')
    }

    return (
        <>
        <div className='main-logged'>
            <div className='main'>
                <div className='logo-nav'>
                    <Link to='/'><img className='header-logo' alt='logo' src={logo} /></Link>
                </div>
                <div className='search-form-nav'>
                    <form className='search-from' onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-nav-res' />
                        <input
                        value={formValue}
                        onChange={e=>setFormValue(e.target.value)}
                        className='search-input'
                        placeholder='What would you like to cook?'
                        />
                    </form>
                </div>
                <div className='splash-navigation'>
                    <div className="dropdown">
                            <button className="dropbtn">ABOUT
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <a href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer" className='gh'>GitHub Repo</a>
                                <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer" className='li'>LinkedIn</a>
                            </div>
                        </div>
                        <Link className='login-button' to='/login'> LOG IN</Link>
                        <Link className='signup-button' to='/signup'> SIGN UP</Link>
                </div>


            </div>
            <div className='splash-navigation-mobile'>
                <div className='mobile-logo-container'>
                    <Link to='/'><img className='header-logo' alt='logo' src={logo} /></Link>
                </div>
                <div className='menu-toggle'>{show === false ? <button className='mobile-nav-links  res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faBars} className='fa-nav-res' /></button>:<button className='mobile-nav-links res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faCaretSquareDown} className='fa-nav-res' /></button>}</div>
                {show === true ? <a className='mobile-nav-links' href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer">GitHub Repo</a>:<></>}
                {show === true ? <a className='mobile-nav-links' href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer">LinkedIn</a>:<></>}
                {show === true ? <Link className='mobile-nav-links' to='/login'> LOG IN</Link>:<></>}
                {show === true ? <Link className='mobile-nav-links' to='/signup'> SIGN UP</Link>:<></>}
            </div>


        </div>
        </>
    )
}

export default SplashNavigation
