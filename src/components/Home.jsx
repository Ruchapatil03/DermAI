import React, { useEffect, useState } from 'react'

import '../stylesheets/Home.css'

import ParticleEffectButton from 'react-particle-effect-button'

const Home = () => {

    const [hidden , sethidde] = useState(true)

    useEffect(() =>{
        sethidde(false)
    },[])

    return (
        <ParticleEffectButton
        color='#FF0000'
        hidden={hidden}
        duration={2000}>
            <div className="container">
                Home
            </div>
        </ParticleEffectButton>
    )
}

export default Home