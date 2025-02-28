import Slider from "../../components/slider/Slider";
import NextoSlider from "../../components/slider/NextoSlider";
import CardProduct from "../../components/card/CardProduct";
import "../../styles/homepage.scss";

const Home = () => {

  return (
    <>
    <div style={{ marginTop:20,marginBottom:20, height: "60.2vh",zIndex:1,display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
      <Slider  />
      <NextoSlider/>
    </div>
    <div className="card_container" style={{ marginBottom:50 }}>
      <CardProduct/> 
      </div>
    </>
  );
};

export default Home;
