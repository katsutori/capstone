const LOAD_INGREDIENTS = 'ingredients/LOAD'
const REMOVE_INGREDIENTS = 'ingredients/REMOVE'
const ADD_INGREDIENTS = 'ingredients/ADD'

export const addIngredients = payload => {
    return {
        type: ADD_INGREDIENTS,
        payload
    }
}

export const loadIngredients = payload => {
    return {
        type: LOAD_INGREDIENTS,
        payload
    }
}

export const removeIngredient = payload => {
    return {
        type: REMOVE_INGREDIENTS,
        payload
    }
}

export const deleteIngredient = ingredient => async dispatch => {
    const response = await fetch(`/api/ingredients/delete/${ingredient}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(removeIngredient(deleted))
    }
}

export const getAllIngredients = recipeId => async dispatch => {
    const response = await fetch (`/api/ingredients`)

    if (response.ok) {
        const ingreds = await response.json()
        dispatch(loadIngredients(ingreds))
        return ingreds
    }
}


const initialState = { entries: []}

const ingredientReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_INGREDIENTS:
            return { ...state, entries: [...action.payload.data]}
        case REMOVE_INGREDIENTS:
            newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default ingredientReducer
