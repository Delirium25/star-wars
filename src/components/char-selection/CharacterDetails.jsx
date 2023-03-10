import React from 'react'
import Star from "./images/star@3x.png"

function CharacterDetails({ selectedCharacter }) {

  function resolveSide(side) {
    if (side === "DARK") {
      return "Sötét"
    } else if (side === "LIGHT") {
      return "Világos"
    } else {
      return "Ismeretlen"
    }
  }

  return (
    <div className='char-detail'>

      <div className='main-details'>
        <div className='details-box'>
          <div className='details-icon'>
            <div className='square'></div>
          </div>
          <div className='texts'>
            <p className='details-title'>OLDAL</p>
            <p>{resolveSide(selectedCharacter.side)}</p>
          </div>
        </div>

        <div className='details-box'>
          <div className='details-icon'>
            <div>
              <img src={Star} alt="star" />
            </div>
          </div>
          <div className='texts'>
            <p className='details-title'>KÜLÖNLEGES ERŐ</p>
            <p>{selectedCharacter.force.power}</p>
          </div>
        </div>

      </div>
      
      <h1 dangerouslySetInnerHTML={{ __html: selectedCharacter.name }}></h1>
      <p className='char-description'>{selectedCharacter.description}</p>
    </div>
  )
}

export default CharacterDetails
