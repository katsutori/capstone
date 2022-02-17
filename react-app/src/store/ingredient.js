const LOAD_INGREDIENTS = 'ingredients/LOAD'

export const loadIngredients = payload => {
    return {
        type: LOAD_INGREDIENTS,
        payload
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
        default:
            return state
    }
}

export default ingredientReducer
