import React, { useEffect, useState } from 'react'
import "./Modules.scss"
import { useContext } from 'react';
import { CharStatesContext } from './Characters';

function Modules() {

    const charStates = useContext(CharStatesContext);
    const selectedCharacter = charStates.selectedCharacter
    const selectedFighters = charStates.selectedFighters;
    const alreadyAddedFighter = selectedFighters.filter(fighter => fighter.id === selectedCharacter.id).length > 0;
    const notSelectableText = "Nem választható"
    const selectCharText = "Karakter kiválasztása"

    const [buttonText, setButtonText] = useState(calculateButtonText());

    useEffect(() => setButtonText(calculateButtonText()), [selectedCharacter])

    function calculateButtonText() {
        return alreadyAddedFighter || !canAddFighter() ? notSelectableText : selectCharText;
    }

    function addFighter() {
        selectedFighters.push(selectedCharacter)
        setButtonText(notSelectableText)
        console.log(selectedFighters)
    }

    function canAddFighter() {
        return selectedFighters.length === 0 || (selectedFighters.length === 1 && selectedFighters[0].side !== selectedCharacter.side)
    }

    function startFightButton() {
        return selectedFighters.length === 2 ? <button>Küzdelem indítása</button> : ""
    }

    return (
        <div className='module-container'>
            <h2>Modulok</h2>
            <div className='flex-container'>
                <div className='functionality-title'>
                    <h3>Szimuláció</h3>
                </div>
                <div className='functionality'>
                    <p>Válassz két karaktert ellentétes oldalakról</p>
                    <div className='module-buttons'>
                        <button disabled={!canAddFighter()} onClick={() => addFighter()}>{buttonText}</button>
                        {startFightButton()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modules
