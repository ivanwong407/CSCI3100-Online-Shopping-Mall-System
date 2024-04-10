import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1>Want Some Exclusive Offers?</h1>
      <p>Subscribe to Our Newsletter Now!</p>
      <div>
        <input type="email" placeholder='CUHK Link Email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter
