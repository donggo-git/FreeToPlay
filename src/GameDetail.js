import React, { useState, useEffect } from 'react'
import 'GameDetail.css'

function GameDetail({ gameID, gameName, gameImg }) {
    const [gameDetail, setGameDetail] = useState({})

    const fetchGameDetail = () => {
        fetch(`https://api.rawg.io/api/games/${gameID}?key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => setGameDetail(data.results))
    }
    useEffect(() => fetchGameDetail(), [])
    return (
        <div>
            {/*game title */}
            <div className='GameDetail__title'>
                <img src={gameImg} className='GameDetail__tittle--img' />
                <div className='GameDetail__title--content'>
                    <h2>{gameName}</h2>
                    <p>{gameDetail.publishers[0].name}</p>
                    <button className='GameDetail__btn'>PLAY</button>
                </div>
            </div>
            {/*game section */}
            <div className='GameDetail__section'>
                {/*rating */}
                <div className='GameDetail__section--rating'>
                    <p>{gameDetail.ratings.reduce((acc, current) => acc + current.id * current.percent, 0) / 100}</p>
                </div>
            </div>
            {/*game img */}
            {/*game detail */}
        </div>
    )
}

export default GameDetail