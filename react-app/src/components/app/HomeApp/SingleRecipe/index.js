import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'

// Import states
import { getAllRecipes, removeRecipe } from '../../../../store/recipe'
import { getAllReviews, removeOneReview } from '../../../../store/review'
import placeholder from '../../../../img/placeholder.jpg'
import './SingleRecipe.css'

const SingleRecipe = () => {
    const dispatch= useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const recipes = useSelector(state => state.recipeState.entries)
    const reviews = useSelector(state => state.reviewState.entries)
    const target = recipes.find(single => single.id === +id)
    const singleReview = reviews.filter(single => single.recipe_id === +id)
    console.log('your single review', singleReview)

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
            await dispatch(getAllReviews(id))
        })();
    }, [dispatch, id])

    const handleDeleteRecipe = async (e) => {
        e.preventDefault()

        await dispatch(removeRecipe(id))
        history.push('/')
    }

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
                    <p className='single-script'>{target.description}</p>
                </div>
                {target.photos.length ? <div className='single-photo-container' style={{backgroundImage: `url(${target.photos[0].url})`}}></div>:<div className='single-photo-container' style={{backgroundImage: `url(${placeholder})`}}></div>}
            </div>
            <div className='cat-reviews'>
                <div className='single-cat'><span className='single-span'>Category:</span> <Link className='single-link' to={`/categories/${target.categories[target.categories.length - 1].name}`}>{target.categories[target.categories.length - 1].name}</Link></div>
                <div className='single-stars'>
                    {user.id === target.user_id ? <Link className='delete-recipe-button' to={`/recipes/${id}/photos/upload`}>Upload Photo</Link>:<></>}
                    {user.id === target.user_id ? <Link className='delete-recipe-button' to={`/recipes/${id}/edit`}>Edit Recipe</Link>:<></>}
                    {user.id === target.user_id ? <button className='delete-recipe-button' onClick={handleDeleteRecipe}>Delete Recipe</button>:<></>}
                    <span className="stars" style={{"--rating": `${rating}`}}></span>
                    </div>
            </div>
            <div className='butt-section'>
                <div className='single-ingredients'>
                <h2 className='single-h2'>Ingredients:</h2>
                    <ul>
                    {target.ingredients[0] ? <li className='ingredient-li'>{target.ingredients[0].name}</li>:<></>}
                    {target.ingredients[1] && target.ingredients[1].name.length > 0 ? <li className='ingredient-li'>{target.ingredients[1].name}</li>:<></>}
                    {target.ingredients[2] && target.ingredients[2].name.length > 0 ? <li className='ingredient-li'>{target.ingredients[2].name}</li>:<></>}
                    {target.ingredients[3] && target.ingredients[3].name.length > 0 ? <li className='ingredient-li'>{target.ingredients[3].name}</li>:<></>}
                    {target.ingredients[4] && target.ingredients[4].name.length > 0 ? <li className='ingredient-li'>{target.ingredients[4].name}</li>:<></>}
                    </ul>
                </div>
                <div>
                    <div className='cooking-instructions'>
                        <h2 className='single-h2'>Cooking Instructions:</h2>
                        <p>{target.instructions}</p>
                    </div>
                    <div className='reviews'>
                    <h2 className='single-h2'>Reviews:</h2>
                        {singleReview?.map((review, idx) => (
                            <div key={idx} className='one-review'>
                            <p className='review-by'><span className='review-by-span'>Review by:</span> {review.user?.username}</p>
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
