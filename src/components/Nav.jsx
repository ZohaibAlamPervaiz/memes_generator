import React from 'react'
import './nav.css'
import image from '../assets/meme.png'
function Nav(){
    return(
        <div className='nav'>
            <h1><img src={image} Style='width : 50px ;' />Memes Generator</h1>
        </div>
        
    )
}
export default Nav