import React from 'react'
import {useSelector} from 'react-redux'

// Import components
import FeaturedRecipe from './Featured'
import './HomeApp.css'


const HomeApp = () => {
    const recipes = useSelector(state=> state.recipeState.entries)
    console.log(Object.values(recipes).length)

    return (
        <>
            <div className='home-container'>
                <FeaturedRecipe />
            </div>
        </>
    )
}


export default HomeApp
