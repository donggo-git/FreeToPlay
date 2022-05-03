import React, { useState, useEffect } from 'react'
import './GameDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faJedi } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function GameDetail({ gameID, gameName, gameImg }) {
    const [gameDetail, setGameDetail] = useState({})
    useEffect(() => {
        fetchGameDetail()


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
    ChartJS.register(ArcElement, Tooltip, Legend);
    const ratingCount = () => {
        let count = [0, 0, 0, 0, 0]
        for (let i in gameDetail.ratings) {
            count.splice(gameDetail.ratings[i].id - 1, 1, gameDetail.ratings[i].count)
        }
        return count
    }
    const ratingData = {
        labels: gameDetail?.ratings?.map(rate => `${rate.id} star`),
        datasets: [
            {
                label: '# of Votes',
                data: ratingCount() || [],
                backgroundColor: [
                    "red",
                    "orange",
                    "yellow",
                    "green",
                    "blue"
                ],
                borderWidth: 0,
            },
        ],
        options: {
            radius: '100px',
            position: 'top'
        }
    };
    const ratingDataOptions = {

        radius: 50,
        layout: {
            padding: 0
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
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
                {/*game rating */}
                <h2>Rating</h2>
                <div>
                    <Doughnut
                        data={ratingData}
                        options={ratingDataOptions}
                        height={"200px"}
                        width="200px"
                    />
                </div>
                {/*game detail */}
            </div>


            <div className='GameDetail__modal'></div>
        </div>
    )
}

export default GameDetail