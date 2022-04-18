import React, { useEffect, useState } from 'react'
import './LoadingPage.css'

function LoadingPage({ height, width }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    return (
        <div
            className='LoadingPage'
            style={{
                top: scrollPosition < 150 ? (150 - scrollPosition) + 'px' : '0px',
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