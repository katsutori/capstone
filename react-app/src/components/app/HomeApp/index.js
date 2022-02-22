import React, {useEffect} from 'react'
import { useDispatch} from 'react-redux'

// Import components
import { getAllRecipes } from '../../../store/recipe'
import FeaturedRecipe from './Featured'
import RecipeRoll from './RecipeRoll'
import Scroll from './Scroll'
import './HomeApp.css'


const HomeApp = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      window.scrollTo({top:0, behavior: 'smooth'})
      }, [])

    useEffect(() => {
        (async() => {
          await dispatch(getAllRecipes())
        })();
      }, [dispatch]);

    return (
        <>
            <div className='home-container'>
                <FeaturedRecipe />
                <RecipeRoll />
            </div>
            <Scroll />
        </>
    )
}


export default HomeApp
