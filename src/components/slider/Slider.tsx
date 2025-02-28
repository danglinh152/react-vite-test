import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

import "../../../node_modules/swiper/swiper-bundle.css";
import "../../styles/slider.scss";
// import "../../../node_modules/swiper/modules/pagination.css"

// import './styles.css';

// import required modules
import { Pagination } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }} // Make pagination clickable
        modules={[Pagination]} // Include Pagination module
        className="mySwiper"
      >
        <SwiperSlide style={{ backgroundColor: "red" }}>Slide 1</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "red" }}>Slide 1</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "red" }}>Slide 1</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "red" }}>Slide 1</SwiperSlide>
      </Swiper>
    </>
  );
}
