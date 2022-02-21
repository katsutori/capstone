import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars, faCaretSquareDown, faCaretDown, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import LogoutButton from '../../auth/LogoutButton'

import logo from '../../../img/logo.png'
import './AppNavigation.css'

function AppNavigation() {
    const [formValue, setFormValue] = useState('')
    const [show, setShow] = useState(false)
    const [cat, setCat] = useState(false)
    const history = useHistory()

    const handleMenu = (e) => {
        e.preventDefault()
        setShow(!show)
        setCat(false)
    }

    const handleCat = (e) => {
        e.preventDefault()
        setCat(!cat)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search/${formValue}`)
        setFormValue('')
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
                    <Link className='recipe-button' to='/recipes/new'>ADD RECIPE</Link>
                    <div className="dropdown">
                            <button className="dropbtn">CATEGORIES
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <Link to='/categories/Breakfast'>Breakfast</Link>
                            <Link to='/categories/Lunch'>Lunch</Link>
                            <Link to='/categories/Dinner'>Dinner</Link>
                            <Link to='/categories/Dessert'>Dessert</Link>
                            <Link to='/categories/Soup'>Soup</Link>
                            <Link to='/categories/Salad'>Salad</Link>
                            <Link to='/categories/Drinks'>Drinks</Link>
                            </div>
                    </div>
                    <div className="dropdown">
                            <button className="dropbtn">ABOUT
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <a href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer" className='gh'>GitHub Repo</a>
                                <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer" className='li'>LinkedIn</a>
                            </div>
                    </div>
                        <LogoutButton className='login-button' />
                </div>

            </div>
            <div className='splash-navigation-mobile'>
                <div className='mobile-logo-container'>
                    <Link to='/'><img className='header-logo' alt='logo' src={logo} /></Link>
                </div>

                <div className='menu-toggle'>{show === false ? <button className='mobile-nav-links  res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faBars} className='fa-nav-res' /></button>:<button className='mobile-nav-links res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faCaretSquareDown} className='fa-nav-res' /></button>}</div>
                {show === true ? <Link className='mobile-nav-links' to='/recipes/new'>Add Recipe</Link>:<></>}
                {show === true ?
                <div className='menu-toggle'>{cat === false ? <button className='mobile-nav-links  res-margin-nest' onClick={handleCat}>Categories<FontAwesomeIcon icon={faCaretDown} className='fa-nav-res carrot' /></button>:<button className='mobile-nav-links res-margin-nest res-open' onClick={handleCat}>Categories<FontAwesomeIcon icon={faXmarkCircle} className='fa-nav-res carrot' /></button>}</div>

                :<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Breakfast'>Breakfast</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Lunch'>Lunch</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Dinner'>Dinner</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Dessert'>Dessert</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Soup'>Soup</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Salad'>Salad</Link>:<></>}
                    {cat === true ? <Link className='mobile-nav-links nested-cat' to='/categories/Drinks'>Drinks</Link>:<></>}
                {show === true ? <a className='mobile-nav-links' href="https://github.com/katsutori/capstone" target="_blank" rel="noreferrer">GitHub Repo</a>:<></>}
                {show === true ? <a className='mobile-nav-links' href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer">LinkedIn</a>:<></>}
                {show === true ? <LogoutButton />:<></>}
                {show === true ? <div className='search-form-nav search-mobile'>
                    <form className='search-from' onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-nav-res' />
                        <input
                        value={formValue}
                        onChange={e=>setFormValue(e.target.value)}
                        className='search-input'
                        />
                    </form>
                </div>:<></>}

            </div>


        </div>
        </>
    )
}

export default AppNavigation
