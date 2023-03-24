import React, { useEffect, useState } from 'react'
import "./Modules.scss"
import { useContext } from 'react';
import { CharStatesContext } from './Characters';

function Modules() {

    const charStates = useContext(CharStatesContext);
    const selectedCharacter = charStates.selectedCharacter
    const selectedFighters = charStates.selectedFighters;
    const setSelectedFighters = charStates.setSelectedFighters;
    const notSelectableText = "Nem választható";
    const selectCharText = "Karakter kiválasztása";
    const removeCharText = "Karakter eltávolítása";

    const [buttonText, setButtonText] = useState(calculateButtonText());

    useEffect(() => { setButtonText(calculateButtonText()) }, [selectedCharacter, selectedFighters])

    function calculateButtonText() {
        if (alreadyAddedFighter()) {
            return removeCharText
        } else if (!canAddFighter()) {
            return notSelectableText
        } else {
            return selectCharText
        }
    }

    function addOrRemoveButton() {
        if (alreadyAddedFighter()) {
            deleteFighter()
        } else {
            addFighter()
        }
        console.log(selectedFighters)
    }

    function addFighter() {
        setSelectedFighters((current) => [...current, selectedCharacter])
    }

    function alreadyAddedFighter() {
        return selectedFighters.find(fighter => fighter.id === selectedCharacter.id);
    }

    function deleteFighter() {
        const updatedFighters = selectedFighters.filter(char => char.id !== selectedCharacter.id)
        setSelectedFighters(updatedFighters)
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
                        <button disabled={!canAddFighter() && !alreadyAddedFighter()} onClick={() => addOrRemoveButton()}>{buttonText}</button>
                        {startFightButton()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modules
