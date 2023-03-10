import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import SwipeButton from "./images/arrow_circle@3x.png";
import { useRef } from 'react';


function CharacterSwiper({ setSelectedCharacter, characters }) {

    const swiperRef = useRef(null);
    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    function loadImage(name) {
        return (require(`./images/${name}@3x.png`))
    }

    return (
        <div>
            <div className='swiper-navigation'>
                <div className='my-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal'></div>
                <img className='prev' onClick={goPrev} src={SwipeButton} alt="previous" />
                <img className='next' onClick={goNext} src={SwipeButton} alt="next" />
            </div>

            <Swiper
                ref={swiperRef}
                autoHeight={true}
                spaceBetween={50}
                loop={true}
                modules={[Pagination]}
                pagination={{
                    el: '.my-swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return '<span class="' + className + ' custom-bullet"></span>';
                    },
                }}
                onSlideChange={(swiper) => {
                    setSelectedCharacter(characters[swiper.realIndex])
                }}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {characters.map((char, index) =>
                    <SwiperSlide key={index} virtualIndex={index}> <img className='char-image' src={loadImage(char.id)} alt={char.name} /> <div className='char-bg'></div> </SwiperSlide>)}
            </Swiper>

        </div>
    )
}

export default CharacterSwiper
