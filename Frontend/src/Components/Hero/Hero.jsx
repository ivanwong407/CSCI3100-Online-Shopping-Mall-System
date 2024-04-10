import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_icon from '../Assets/hero-image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Welcome to Your Campus Shopping Platform</h2>
        <div>
            <div className="hero-hand-icon">
                <p>Hi</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>See what good deals are there!</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
        </div>
        <div className="hero-right">
            <img src={hero_icon} alt="" width="500" />

        </div>
    </div>
  )
}

export default Hero
