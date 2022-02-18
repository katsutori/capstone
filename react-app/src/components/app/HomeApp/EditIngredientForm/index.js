import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getAllIngredients, loadIngredients } from '../../../../store/ingredient';
import { editOneIngredient } from '../../../../store/ingredient';

const EditIngredientForm = ({ingredientId, ingredientName}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(ingredientName);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('your ing data', ingredientId, name)
        const payload = {
            ingId: ingredientId,
            name
        }

        const editedIng = await dispatch(editOneIngredient(payload))


        if (editedIng.errors) {
            setErrors(editedIng.errors)
        }
        else if (!editedIng.errors) {
            await dispatch(getAllIngredients())
            history.push(`/recipes/${id}`)
        }
    }


    return (
        <div className='new-ing-form-container'>
            <form className='new-ing-form' onSubmit={handleSubmit}>
                {errors.length ?
                <div className="error-container">
                    <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                    </ul>
                </div>
                :<></>}
                <div>
                    <label className="new-review-label"> Edit an ingredient
                        <input
                            className='new-ing-input'

                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Ingredient"
                        />
                    </label>
                </div>
                <div className='ing-buttons-container'>
                    <button className='add-ing-button' type='submit'>Edit Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default EditIngredientForm
