import React from 'react'
import './HomePage.css'
import FindingBar from './FindingBar'

function HomePage() {
    return (
        <div className='Homepage'>
            <div className='logo'>pet finder</div>
            <FindingBar />
        </div>
    )
}

export default HomePage