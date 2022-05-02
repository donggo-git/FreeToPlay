import React, { useState, useEffect } from 'react'
import './GameDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faJedi } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

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
                <div className='GameDetail__sections'>
                    {/*rating */}
                    <div className='GameDetail__section rating'>
                        <p>Rating</p>
                        <p>{gameDetail?.rating}</p>
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    {/*achievement count */}
                    <div className='GameDetail__section achievement'>
                        <p>Achievements</p>
                        <p>{gameDetail?.achievements_count}</p>
                        <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    { /*suggestion */}
                    <div className='GameDetail__section suggestion'>
                        <p>Suggestions</p>
                        <p>{gameDetail?.suggestions_count}</p>
                        <FontAwesomeIcon icon={faJedi} />
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