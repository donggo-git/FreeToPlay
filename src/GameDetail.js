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
    const [isDescribeShowMore, setIsGameDescribeShowMore] = useState(false)
    useEffect(() => {
        fetchGameDetail()
        console.log(gameDetail)

    }
        , [gameID])
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
    //create and register donut char for Rating
    ChartJS.register(ArcElement, Tooltip, Legend);
    const ratingCount = () => {
        let count = [0, 0, 0, 0, 0]
        for (let i in gameDetail.ratings) {
            count.splice(gameDetail.ratings[i].id - 1, 1, gameDetail.ratings[i].count)
        }
        return count
    }
    const ratingData = {
        labels: ['1 star', '2 stars', '3 stars', '4 starts', '5 star',],
        datasets: [
            {
                label: '# of Votes',
                data: ratingCount() || [],
                backgroundColor: [
                    "red",
                    "orange",
                    "yellow",
                    //color green
                    'rgb(2, 230, 2)',
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
    //
    const handleShowMoreDescribe = () => {
        setIsGameDescribeShowMore(!isDescribeShowMore)
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
                        <a
                            href={gameDetail?.website}
                            target='blank'
                            className='GameDetail__btn'
                        >
                            PLAY
                        </a>
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
                <div className='gameDetail__rating'>
                    <h2>Rating</h2>
                    <div>
                        <Doughnut
                            data={ratingData}
                            options={ratingDataOptions}
                            height={"200px"}
                            width="200px"
                        />
                    </div>
                </div>
                {/*game detail description */}
                <div className='gameDetail__description--container'>
                    <p className='gameDetail__description'>

                        {
                            isDescribeShowMore ?
                                //at standard game description only show 30 words
                                //if user click on show more they will get full description
                                gameDetail?.description_raw :
                                `${gameDetail?.description_raw?.split(" ").slice(0, 30).join(" ")} ...`
                        }
                    </p>
                    <p
                        className='showMore--btn'
                        onClick={() => handleShowMoreDescribe()}
                    >
                        {
                            isDescribeShowMore ?
                                "Show less" :
                                "Show more"
                        }
                    </p>
                </div>
                {/*game imgs */}
                <div className='gameDetail__imgs'>
                    <div
                        className='gameDetail__img'
                        style={{
                            backgroundImage: `url("${gameDetail.background_image}")`
                        }}
                        on
                    >
                    </div>
                    <div
                        className='gameDetail__img'
                        style={{
                            backgroundImage: `url("${gameDetail.background_image_additional}") `
                        }}
                    >
                    </div>
                </div>
            </div>


            <div className='GameDetail__modal'></div>
        </div>
    )
}

export default GameDetail