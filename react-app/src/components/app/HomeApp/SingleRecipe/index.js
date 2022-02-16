import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'

// Import states
import { getAllRecipes } from '../../../../store/recipe'

import './SingleRecipe.css'

const SingleRecipe = () => {
    const dispatch= useDispatch()
    const History = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipeState.entries)

    const target = recipes.find(single => single.id === +id)

    useEffect(() => {
        (async() => {
            await dispatch(getAllRecipes())
        })();
    }, [dispatch, id])

    if (!target) {
        return (
            <h1>Is loading...</h1>
        )
    }

    return (
        <div className='single-recipe-container'>
            <div className='single-meta'>
                <div className='single-title'>{target.name}</div>
                <div className='single-by'>By {target.user.username}</div>
            </div>
            <div className='single-photo'>
                <div>
                    <h2 className='single-h2'>{target.user.username}'s thoughts:</h2>
                    <p>{target.description}</p>
                </div>
                <div className='single-photo-container' style={{backgroundImage: `url(${target.photos[0].url})`}}></div>
            </div>
            <div className='cat-reviews'>
                <div>{target.categories[0].name}</div>
                <div></div>
            </div>
        </div>
    )
}

export default SingleRecipe
