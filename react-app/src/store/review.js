const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const EDIT_REVIEW = 'reviews/EDIT'
const DELETE_REVIEW = 'reviews/DELETE'

export const loadReviews = reviewData => {
    return {
        type: LOAD_REVIEWS,
        reviewData
    }
}

export const addReview = reviewData => {
    return {
        type: ADD_REVIEW,
        reviewData
    }
}

export const editReview = reviewData => {
    return {
        type: EDIT_REVIEW,
        reviewData
    }
}

export const deleteReview = reviewData => {
    return {
        type: DELETE_REVIEW,
        reviewData
    }
}

export const getAllReviews = recipeId => async dispatch => {

    const response = await fetch (`/api/recipe/${recipeId}/reviews/`)

    if (response.ok) {
        const reviews = await response.json()

        dispatch(loadReviews(reviews))
        return reviews
    }
}

export const newReview = (reviewData) => async dispatch => {

    const response = await fetch(`/api/recipe/${reviewData.recipeId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const newRev = await response.json()

        dispatch(addReview(newRev))
        return newRev
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const editOneReview = reviewData => async dispatch => {

    const response = await fetch(`/api/recipe/${reviewData.recipeId}/reviews/${reviewData.id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })


    if (response.ok) {
        const editedRev = await response.json()
        dispatch(editReview(editedRev))
        return editedRev
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const removeOneReview = reviewData => async dispatch => {

    const response = await fetch(`/api/recipe/${reviewData.recipeId}/reviews/${reviewData.reviewToDeleteId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const deleteMessage = await response.json()

        dispatch(deleteReview(reviewData))
        return deleteMessage
    }
}

const initialState = { entries: [] }

const reviewReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, entries: [...action.reviewData.reviews]}
        case ADD_REVIEW:
            newState = { ...state }
            return { ...newState }
        case EDIT_REVIEW:
            newState = { ...state }
            return { ...newState }
        case DELETE_REVIEW:
            newState = { ...state }

            let target = action.reviewData.reviewToDeleteId
            let removing = newState.entries.find(review => review.id === target)
            let idx = newState.entries.indexOf(removing)

            let stateOne = newState.entries.slice(0, idx)
            let stateTwo = newState.entries.slice(idx + 1)

            return { ...newState, entries: [...stateOne, ...stateTwo] }
        default:
            return state;
    }
}

export default reviewReducer
