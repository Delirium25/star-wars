import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import "./Characters.scss"
import { useContext } from 'react';
import { UserContextContainer } from '../../App';
import CharacterSwiper from './CharacterSwiper';
import CharacterDetails from './CharacterDetails';
import CharStates from './CharStates';

export const CharStatesContext = React.createContext();

function Characters() {

    const [characters, setCharacters] = useState([])
    const [errors, setErrors] = useState()
    const [selectedCharacter, setSelectedCharacter] = useState()
    const [selectedFighters, setSelectedFighters] = useState([])

    const userContext = useContext(UserContextContainer)
    const charStatesContext = new CharStates(characters, setCharacters, errors, setErrors, selectedCharacter, setSelectedCharacter, selectedFighters, setSelectedFighters)

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
                {selectedCharacter != null ? <CharacterDetails /> : ""}
                <CharacterSwiper />
            </div>
        </>
    }

    return (
        <>
            <CharStatesContext.Provider value={charStatesContext}>
                <div className='char-root'>
                    <Layout>
                        {errors != null ? <div className='error'>{errors}</div> : charactersPage()}
                    </Layout>
                </div>
            </CharStatesContext.Provider>
        </>
    )
}

export default Characters
