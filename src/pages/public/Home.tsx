import { Flex } from "antd";
import Slider from "../../components/slider/Slider";
import NextoSlider from "../../components/slider/NextoSlider";


const Home = () => {

  return (
    <div style={{ marginTop:20, height: "50vh",zIndex:1,display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
      <Slider  />
      <NextoSlider/>
    </div>
  );
};

export default Home;
