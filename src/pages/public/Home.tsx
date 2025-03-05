import Slider from "../../components/slider/Slider";
import NextoSlider from "../../components/slider/NextoSlider";
import CardProduct from "../../components/card/CardProduct";
import "../../styles/homepage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Tabs , Statistic } from "antd";
import SingleProduct from "../../components/card/SingleProduct";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "../../components/load/LoadingBar";
import IconCard from "../../components/iconcard/IconCard";


const Home = () => {
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 ; 
  const onFinish = () => {
    deadline
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
    <div style={{ background:"white",border:"1px solid white",borderRadius:12,marginTop:20,marginBottom:20, height: "60.2vh",zIndex:1,display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
      <Slider  />
      <NextoSlider/>
    </div>
    <div style={{ width:"100%", height:70,background:"white",border:"1px solid white",borderRadius:12, marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
      <div style={{ display:"flex",alignItems:"center" }}>
         <img src="http://localhost:8080/storage/upload/download.png" style={{ paddingLeft:20,height:60,width:125 }} alt="" />
          <p style={{ fontSize:16,fontWeight:600,paddingRight:12 }} >Kết thúc sau:</p>
           <Countdown style={{ fontSize:18, fontWeight:600 }} value={deadline} onFinish={onFinish} />
      </div>
      <div style={{  cursor:"pointer",paddingRight:20 ,display:"flex",alignItems:"center" }}>
          <p  style={{ fontSize:15,fontWeight:600,color:"blue",paddingRight:8 }} onClick={() => navigate(`/adventure`)} >Xem tất cả</p>
          <FontAwesomeIcon style={{ color:"blue" }} icon={faChevronRight} />
      </div>
    </div>
      <CardProduct /> 

      <div style={{ width:"100%", height:100,background:"white",border:"1px solid white",borderRadius:12, marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-around" }}>
          <IconCard name="Top Deal" path="like.png" />
          <IconCard name="Trading" path="trading.png" />
          <IconCard name="Coupon siêu hot" path="coupon.png" />
          <IconCard name="Top sách bán chạy" path="book.png" />
          <IconCard name="Xả kho giảm nửa giá" path="sale.png" />
          <IconCard name="Top sách nước ngoài" path="foreign.png" />

          
      </div>
      <div style={{ width:"100%", height:900,background:"white", marginBottom:20,display:"flex",flexDirection:"column" }}>
      <div style={{ }}>
          <p style={{paddingLeft:20,paddingBottom:20,paddingTop:20, fontSize:18,fontWeight:600 }}>Bạn có thể thích </p>
       <div >
       <div
       style={{  }} >
        <Tabs
          centered
          tabBarGutter={160}
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Dành cho bạn",
              children: <SingleProduct  bookId={1} /> 
            },
            {
              key: "2",
              label: "Top Deal",
              
            },
            {
              key: "3",
              label: "Freeship 100K",
              
            },
            {
              key: "4",
              label: "Sách xả kho",
            },
            {
              key: "5",
              label: "Siêu sale",
            },
          ]}
        />
      </div>
          <div className="card_container" style={{ marginBottom:50 }}>

          </div>
         </div>
      </div>

    </div>
    </>
  );
};

export default Home;
