import React, { useEffect, useState } from 'react'
import './Filter.css'
import LoadingPage from './LoadingPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function Filter({ handleFilter, scrollPosition, isFilterOpen, handleFilterOpen }) {
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchGenres = async () => {
        await fetch(`https://api.rawg.io/api/genres?key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setGenres(data.results)
            })

    }
    const fetchPlatforms = async () => {
        await fetch(`https://api.rawg.io/api/platforms?key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => setPlatforms(data.results.slice(0, 15)))
    }
    const fetchTags = async () => {
        await fetch(`https://api.rawg.io/api/tags?key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setTags(data.results)
                setTimeout(setIsLoading(false), 100)
            })
    }
    //fetching genres, platforms and tags
    const fetchFilter = () => {
        try {
            setIsLoading(true)
            fetchGenres()
            fetchPlatforms()
            fetchTags()
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchFilter()
    }, [])
    return (
        <div className='Filter__container'
            style={{
                top: scrollPosition < 180 ? `${180 - scrollPosition}px` : `0px`,
                left: window.innerWidth < 1000 ?
                    (isFilterOpen ? '0px' : '-250px') :
                    '0px',
                height: scrollPosition < 180 ? `calc(100vh - ${(200 - scrollPosition)}px)` : `100vh`
            }}
        >
            {/* filter btn */}
            <div
                className='Filter__btn'
                onClick={() => handleFilterOpen()}
            >
                <span><FontAwesomeIcon icon={faFilter} /></span> Filter
            </div>
            {/*modal */}
            <div className='modal'></div>
            {/*filter */}
            <div
                className='Filter'

            >

                {/**genres */}
                <div className='Filter__section'>
                    <p className='Filter__section--title'>genres</p>
                    <div className='Filter__checkboxes'>
                        {genres.length > 0 ? genres.map(genre => (
                            <div className='Filter__checkbox' key={genre.name}>
                                <input
                                    type='checkbox'
                                    value={genre.slug}
                                    onChange={(e) => handleFilter('genres', e.target.value)}
                                    id={genre.slug}
                                    style={{ backgroundImg: genre.image_background }}
                                />
                                <label for={genre.slug}>
                                    <img src={genre.image_background} height='100%' />
                                    <span>{genre.slug}</span>
                                </label>
                            </div>
                        )) :
                            <div></div>
                        }
                    </div>
                </div>
                {/**platforms */}
                <div className='Filter__section'>
                    <p className='Filter__section--title'>platforms</p>
                    <div className='Filter__checkboxes'>
                        {platforms.length > 0 ? platforms.map(platform => (
                            <div className='Filter__checkbox' key={platform.name}>
                                <input
                                    type='checkbox'
                                    value={platform.id}
                                    onChange={(e) => handleFilter('platforms', e.target.value)}
                                    id={platform.slug}
                                />
                                <label for={platform.slug}>
                                    <img src={platform.image_background} />
                                    <span>{platform.slug}</span>
                                </label>
                            </div>
                        )) :
                            <div></div>
                        }
                    </div>
                </div>
                {/**tags */}
                <div className='Filter__section'>
                    <p className='Filter__section--title'>tags</p>
                    <div className='Filter__checkboxes'>
                        {tags.length > 0 ? tags.map(tag => (
                            <div className='Filter__checkbox' key={tag.name}>
                                <input
                                    type='checkbox'
                                    value={tag.slug}
                                    onChange={(e) => handleFilter('tags', e.target.value)}
                                    id={tag.slug}
                                />
                                <label for={tag.slug}>
                                    <img src={tag.image_background} />
                                    <span>{tag.slug}</span>
                                </label>
                            </div>
                        )) :
                            <div></div>
                        }
                    </div>
                </div>
                {
                    isLoading && <LoadingPage top='180px' height='100%' width='240px' />
                }
            </div>
        </div>
    )
}

export default Filter
