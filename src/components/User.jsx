import React from 'react'
import "../style/User.css"
import Card from "./Card"
import Followers from './Followers'

const User = () => {
  return (
    <section className='section'>
        <div className='section-center user-wrapper'>
            <Card/>
            <Followers />
        </div>
    </section>
  )
}

export default User
