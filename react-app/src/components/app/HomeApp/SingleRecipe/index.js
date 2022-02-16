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

    let rating = 0;
    const ratings = target?.reviews?.map(review => review.rating)
    if (ratings?.length) {
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }

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
                <div className='single-cat'><span className='single-span'>Category:</span> <Link className='single-link' to={`/categories/${target.categories[0].name}`}>{target.categories[0].name}</Link></div>
                <div className='single-stars'><span className="stars" style={{"--rating": `${rating}`}}></span></div>
            </div>
        </div>
    )
}

export default SingleRecipe
