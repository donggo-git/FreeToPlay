import React, { useState, useEffect } from 'react'

function GameDetail({ gameID }) {

    const fetchGameDetail = () => {
        fetch(`https://api.rawg.io/api/games/${gameID}?key=${apiKey}`)
    }
    useEffect()
    return (
        <div>

        </div>
    )
}

export default GameDetail