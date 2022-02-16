import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import './AddRecipeForm.css'


const NewRecipeForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [category, setCategory] = useState("Breakfast")
    const [ingredient_one, setOne] = useState("")
    const [ingredient_two, setTwo] = useState("")
    const [ingredient_three, setThree] = useState("")
    const [ingredient_four, setFour] = useState("")
    const [ingredient_five, setFive] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handlePost = async (e) => {
        e.preventDefault()
    }

    return (
        <div className='new-recipe-form-container'>
            <form onSubmit={handlePost}>
                <h1>Add your budget recipe!</h1>
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
                                <option value="Drink">Drink</option>
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
                <div>
                    <label> Second Ingredient
                        <input
                            type='text'
                            value={ingredient_two}
                            onChange={ e => setTwo(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label> Third Ingredient
                        <input
                            type='text'
                            value={ingredient_three}
                            onChange={ e => setThree(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label> Fourth Ingredient
                        <input
                            type='text'
                            value={ingredient_four}
                            onChange={ e => setFour(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label> Fifth Ingredient
                        <input
                            type='text'
                            value={ingredient_five}
                            onChange={ e => setFive(e.target.value)}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
}

export default NewRecipeForm
