import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editingRecipe } from '../../../../store/recipe';
import { getAllRecipes } from '../../../../store/recipe';

const EditRecipeForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const recipes = useSelector(state => state.recipeState.entries)
    const target = recipes.find(single => single.id === +id)


    if (target) {
        localStorage.setItem('name', target.name)
        localStorage.setItem('description', target.description)
        localStorage.setItem('instructions', target.instructions)
        localStorage.setItem('category', target.categories[0]?.name)
        localStorage.setItem('one', target.ingredients[0]?.name)
        localStorage.setItem('two', target.ingredients[1]?.name)
        localStorage.setItem('three', target.ingredients[2]?.name)
        localStorage.setItem('four', target.ingredients[3]?.name)
        localStorage.setItem('five', target.ingredients[4]?.name)
    }


    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(localStorage.getItem('name'))
    const [description, setDescription] = useState(localStorage.getItem('description'))
    const [instructions, setInstructions] = useState(localStorage.getItem('instructions'))
    const [category, setCategory] = useState(localStorage.getItem('category'))
    const [ingredient_one, setOne] = useState(localStorage.getItem('one'))
    const [ingredient_two, setTwo] = useState(localStorage.getItem('two'))
    const [ingredient_three, setThree] = useState(localStorage.getItem('three'))
    const [ingredient_four, setFour] = useState(localStorage.getItem('four'))
    const [ingredient_five, setFive] = useState(localStorage.getItem('five'))
    console.log(category)
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handlePost = async (e) => {
        e.preventDefault()
        let user_id = user.id
        console.log('hellllllllllllo', category)
        const newRecipe = await dispatch(editingRecipe(name, description, instructions, category, ingredient_one, user_id, id))

        if(newRecipe.errors) {
            setErrors(newRecipe.errors)
        }


            await fetch(`/api/recipes/ingredient/${target.ingredients[0]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_one,
                    recipe_id: id
                })
            })



            await fetch(`/api/recipes/ingredient/${target.ingredients[1]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_two,
                })
            })



            await fetch(`/api/recipes/ingredient/${target.ingredients[2]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_three,
                })
            })



            await fetch(`/api/recipes/ingredient/${target.ingredients[3]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_four,
                })
            })



            await fetch(`/api/recipes/ingredient/${target.ingredients[4]?.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: ingredient_five,
                })
            })


        await dispatch(getAllRecipes())
        history.push(`/recipes/${id}`)
    }

    if(!target) {
        return (
            <h1>There's nothing here.</h1>
        )
    }

    return (
        <div className='new-recipe-form-container'>
            <form onSubmit={handlePost}>
                <h1>Edit your budget recipe!</h1>
                <div >
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label> Recipe Name
                        <input
                            type='text'
                            value={name}
                            onChange={ e => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label> Description
                        <textarea
                            type='text'
                            value={description}
                            onChange={ e => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label> Instructions
                        <textarea
                            type='text'
                            value={instructions}
                            onChange={ e => setInstructions(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label> Choose a Category
                    <select value={category} onChange={ e => setCategory(e.target.value)}>
                                <option  value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Soup">Soup</option>
                                <option value="Salad">Salad</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                    </label>
                </div>
                <div>
                    <label> First Ingredient
                        <input
                            type='text'
                            value={ingredient_one}
                            onChange={ e => setOne(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {ingredient_two !== 'undefined' ? <div>
                    <label> Second Ingredient
                        <input
                            type='text'
                            value={ingredient_two}
                            onChange={ e => setTwo(e.target.value)}
                        />
                    </label>
                </div>:<></>}
                {ingredient_three !== 'undefined' ? <div>
                    <label> Third Ingredient
                        <input
                            type='text'
                            value={ingredient_three}
                            onChange={ e => setThree(e.target.value)}
                        />
                    </label>
                </div>:<></>}
                {ingredient_four !== 'undefined' ? <div>
                    <label> Fourth Ingredient
                        <input
                            type='text'
                            value={ingredient_four}
                            onChange={ e => setFour(e.target.value)}
                        />
                    </label>
                </div>:<></>}
                {ingredient_five !== 'undefined' ? <div>
                    <label> Fifth Ingredient
                        <input
                            type='text'
                            value={ingredient_five}
                            onChange={ e => setFive(e.target.value)}
                        />
                    </label>
                </div>:<></>}
                <div>
                    <button type='submit'>Edit Recipe</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipeForm
