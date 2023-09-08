import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

export default function SwiperImg(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log('data swiper', props.data);

  return (
    <>
      {props.data.files.filter(f => f.subject.name === 'IMAGES').length ===
      1 ? (
        <SwiperSlide>
          <img
            src={
              props.data.files.filter(f => f.subject.name === 'IMAGES')[0].url
            }
          />
        </SwiperSlide>
      ) : (
        <>
          <Swiper
            style={{
              '--swiper-navigation-color': 'rgb(0, 52, 109)',
              '--swiper-pagination-color': 'rgb(0, 52, 109)'
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {props.data.files
              .filter(f => f.subject.name === 'IMAGES')
              .map((item, key) => {
                return (
                  <SwiperSlide>
                    <img src={item.url} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          {props.data.files.filter(f => f.subject.name === 'IMAGES') >= 2 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {props.data.files
                .filter(f => f.subject.name === 'IMAGES')
                .map((item, key) => {
                  return (
                    <SwiperSlide>
                      <img src={item.url} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          )}
        </>
      )}
    </>
  );
}
