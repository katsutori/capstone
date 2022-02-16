import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './OneRoll.css'


const OneRoll = ({recipe}) => {

    let rating = 0
    const ratings = recipe.reviews.map(review => review.rating)
    if (ratings?.length) {
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }


    return (
        <div className='one-roll-container'>
            <div className='one-roll-image' style={{backgroundImage: `url(${recipe.photos[0].url})`}}></div>
            <div className='one-roll-title'>
                <h2>{recipe.name}</h2>
                <p>By: {recipe.user.username}</p>
            </div>
            <div className='one-roll-bottom'>
                <span className="stars2" style={{"--rating": `${rating}`}}></span>
                <div><Link className='get-recipe-button' to='/'>Get Recipe</Link></div>
            </div>
        </div>
    )
}


export default OneRoll
