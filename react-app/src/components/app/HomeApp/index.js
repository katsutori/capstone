import React, { useReducer } from 'react'
import {useSelector} from 'react-redux'

import './HomeApp.css'


const HomeApp = () => {
    const recipes = useSelector(state=> state.recipeState.entries)
    console.log(Object.values(recipes).length)

    return (
        <>
            <div>
                {recipes.map((recipe, idx) => (
                    <p key={idx}>{recipe.name}</p>
                ))}
            </div>
        </>
    )
}


export default HomeApp
