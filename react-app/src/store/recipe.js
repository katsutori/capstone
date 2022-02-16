const LOAD_RECIPES = 'recipes/LOAD'

export const loadRecipes = payload => {
    return {
        type: LOAD_RECIPES,
        payload
    }
}

export const getAllRecipes = () => async dispatch => {

    const response = await fetch(`/api/recipes`, {
        method: 'GET'
    })

    if (response.ok) {
        const recipes = await response.json()

        dispatch(loadRecipes(recipes))
    }
}

export const initialState = {entries:[]}

const recipeReducer = ( state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_RECIPES:
            return {...state, entries: [...action.payload['data']]}
        default:
            return state
    }
}

export default recipeReducer
