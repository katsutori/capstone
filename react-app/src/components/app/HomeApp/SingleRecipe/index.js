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
        window.scrollTo(0, 0)
      }, [])


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
            <div className='butt-section'>
                <div>
                <h2 className='single-h2'>Ingredients:</h2>
                    <ul>
                    {target.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient.name}</li>
                    ))}
                    </ul>
                </div>
                <div>
                    <div className='cooking-instructions'>
                        <h2 className='single-h2'>Cooking Instructions:</h2>
                        <p>{target.instructions}</p>
                    </div>
                    <div className='reviews'>
                    <h2 className='single-h2'>Reviews:</h2>
                        {target.reviews.map((review, idx) => (
                            <div className='one-review'>
                            <p key={idx}>{review.review}</p>
                                <div className='id-review'>
                                    {user.id === review.user_id ? <button className='single-butts'>Edit</button>:<></>}
                                    {user.id === review.user_id ? <button className='single-butts'>Delete</button>:<></>}
                                    <span className="stars" style={{"--rating": `${review.rating}`}}></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRecipe
