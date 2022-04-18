import React, { useEffect, useState } from 'react'
import './LoadingPage.css'

function LoadingPage({ height, width }) {
    const handleLoadingScroll = () => {
        let newScrollPosition = window.scrollY
        if (newScrollPosition < 180) return 180 - newScrollPosition;
        else return 0
    }
    return (
        <div
            className='LoadingPage'
            style={{
                top: handleLoadingScroll(),
                width: width,
                height: height
            }}
        >
            <div className='LoadingPage__content'>
                <h2>Loading...</h2>
                <div className='LoadingPage__cols'>
                    <div className='LoadingPage__col--1' />
                    <div className='LoadingPage__col--2' />
                    <div className='LoadingPage__col--3' />
                </div>
            </div>
        </div>
    )
}

export default LoadingPage