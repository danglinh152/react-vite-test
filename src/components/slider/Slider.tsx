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
        style={{ width:"65%",paddingRight:20 }}
      >
        <SwiperSlide  style={{
                 backgroundImage: `url("http://localhost:8080/storage/upload/MCBooks_KCt3_840x320.png")`,
                 backgroundSize: "contain", // Fit ảnh trong khung
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center",
                 minHeight: "200px",
              }}></SwiperSlide>
        <SwiperSlide  style={{
          backgroundImage: `url("http://localhost:8080/storage/upload/Screenshot_2025-02-28_141857.jpg")`,
          backgroundSize: "contain", // Fit ảnh trong khung
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "200px",
          
        }}></SwiperSlide>
              <SwiperSlide  style={{
          backgroundImage: `url("http://localhost:8080/storage/upload/MCBooks_KCt3_840x320.png")`,
          backgroundSize: "contain", // Fit ảnh trong khung
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "200px",
          
          
        }}></SwiperSlide>
      </Swiper>
    </>
  );
}
