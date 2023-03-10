import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import "./Characters.scss"
import { useContext } from 'react';
import { UserContextContainer } from '../../App';
import CharacterSwiper from './CharacterSwiper';
import CharacterDetails from './CharacterDetails';

function Characters() {

    const [characters, setCharacters] = useState([])
    const [errors, setErrors] = useState()
    const [selectedCharacter, setSelectedCharacter] = useState()

    const userContext = useContext(UserContextContainer)

    useEffect(() => {
        fetch("https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/", {
            method: "GET",
            headers: {
                "Content-Type": "application / json",
                "Applicant-Id": "33UvnYtU",
                "Application-Authorization": "Bearer " + userContext.userData.token,
            },
            mode: "cors",
            cache: "default",
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then((data) => {
                            setCharacters(data.characters)
                            setSelectedCharacter(data.characters[0])
                            console.log("Characters loaded: ", data.characters[0], data.characters)
                        })
                } else if (response.status >= 400 && response.status < 500) {
                    response.json()
                        .then((data) => {
                            console.log(`${response.status} login error:`, data)
                            setErrors("Váratlan hiba a belépés során!")
                        })
                }
            })
    }, [])

    function charactersPage() {
        return <>
            <div className='char-content'>
                {selectedCharacter != null ? <CharacterDetails selectedCharacter={selectedCharacter} /> : ""}
                <CharacterSwiper characters={characters} setSelectedCharacter={setSelectedCharacter} />
            </div>
        </>
    }

    return (
        <>
            <div className='char-root'>
                <Layout>
                    {errors != null ? <div className='error'>{errors}</div> : charactersPage()}
                </Layout>
            </div>
        </>
    )
}

export default Characters
