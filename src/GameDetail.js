import React, { useState, useEffect } from 'react'
import './GameDetail.css'

function GameDetail({ gameID, gameName, gameImg }) {
    const [gameDetail, setGameDetail] = useState({})
    useEffect(() => {
        fetchGameDetail()
        console.log(gameDetail)
    }
        , [gameID, gameName, gameImg])
    const fetchGameDetail = async () => {
        try {
            await fetch(`https://api.rawg.io/api/games/3498?key=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setGameDetail(data)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='GameDetail__container'>

            <div className='GameDetail'>
                {/*game title */}
                <div className='GameDetail__title'>
                    <img src={gameDetail.background_image} className='GameDetail__tittle--img' />
                    <div className='GameDetail__title--content'>
                        <h2>{gameDetail.name}</h2>
                        <p>{gameDetail?.publishers?.[0]?.name}</p>
                        <button className='GameDetail__btn'>PLAY</button>
                    </div>
                </div>
                {/*game section */}
                <div className='GameDetail__section'>
                    {/*rating */}
                    <div className='GameDetail__section--rating'>
                        <p>{gameDetail?.ratings?.reduce((acc, current) => acc + current.id * current.percent, 0) / 100}</p>
                    </div>
                </div>
                {/*game img */}
                {/*game detail */}
            </div>


            <div className='GameDetail__modal'></div>
        </div>
    )
}

export default GameDetail