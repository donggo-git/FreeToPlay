import React, { useEffect, useState } from 'react'
import './Filter.css'

function Filter({ handleSearch, handleFilter }) {
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [tags, setTags] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        //console.log(position)
        setScrollPosition(position);
    };

    const fetchGenres = () => {
        fetch('https://api.rawg.io/api/genres?key=4d9f3393dbcd43549ea70dc0f6cff3b9')
            .then(res => res.json())
            .then(data => setGenres(data.results))
    }
    const fetchPlatforms = () => {
        fetch('https://api.rawg.io/api/platforms?key=4d9f3393dbcd43549ea70dc0f6cff3b9')
            .then(res => res.json())
            .then(data => setPlatforms(data.results.slice(0, 15)))
    }
    const fetchTags = () => {
        fetch('https://api.rawg.io/api/tags?key=4d9f3393dbcd43549ea70dc0f6cff3b9')
            .then(response => response.json())
            .then(data => setTags(data.results))
    }
    //fetching genres, platforms and tags
    useEffect(() => {
        fetchGenres();
        fetchPlatforms();
        fetchTags()
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    return (
        <div
            className='Filter'
            style={scrollPosition < 180 ? { top: `${180 - scrollPosition}px` } : { top: '0px' }}
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
                                value={platform.slug}
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
        </div>
    )
}

export default Filter