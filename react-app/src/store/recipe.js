const LOAD_RECIPES = 'recipes/LOAD'
const ADD_RECIPE = 'recipes/ADD'
const DELETE_RECIPE = 'recipes/DELETE'

export const loadRecipes = payload => {
    return {
        type: LOAD_RECIPES,
        payload
    }
}

export const addRecipe = payload => {
    return {
        type: ADD_RECIPE,
        payload
    }
}

export const deleteRecipe = deletedRecipe => {
    return {
        type: DELETE_RECIPE,
        deletedRecipe
    }
}

export const removeRecipe = recipe => async dispatch => {
    const response = await fetch(`/api/recipes/delete/${recipe}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteRecipe(deleted))
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

export const newRecipes = (name, description, instructions, category, ingredient_one, user_id) => async dispatch => {
    console.log(name, description, instructions, category)
    const response = await fetch(`/api/recipes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            instructions,
            category,
            ingredient_one,
            user_id
        })
    })
    if(response.ok) {
        const newRecipe = await response.json()

        dispatch(addRecipe(newRecipe))
        return newRecipe
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return {'errors':data.errors};
        }
      } else {
        return ['An error occurred. Please try again.']
      }

    return response
}

export const initialState = {entries:[]}

const recipeReducer = ( state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_RECIPES:
            return {...state, entries: [...action.payload['data']]}
        case ADD_RECIPE:
            return {...state, entries: [...state.entries, action.payload]}
        case DELETE_RECIPE:
            newState = { ...state }

            let target = action.deletedRecipe.id
            let removing = newState.entries.find(one => one.id === target)
            let idx = newState.entries.indexOf(removing)

            newState.entries.splice(idx, 1)
            return newState
        default:
            return state
    }
}

export default recipeReducer
