import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import './Scroll.css'

const Scroll = () => {
    const [visible, setVisible] = useState(false)

    const toggleButton = () => {
        if (window.pageYOffset > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const scrollUp = () => {
        window.scrollTo({top:0, behavior:"smooth"})
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleButton)

        return () => {
            window.removeEventListener("scroll", toggleButton)
        }
    }, [])

    return (
        <div className='back-to-top'>
            {visible === true ? <button type='button' className='scroll-butt' onClick={scrollUp}><FontAwesomeIcon icon={faArrowCircleUp} className='fa-nav-res scroll-arrow' /></button>:<></>}
        </div>
    )
}

export default Scroll
