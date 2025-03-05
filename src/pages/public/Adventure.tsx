import { faFilter, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Divider, Radio, Rate, Row, Select } from "antd";
import { useState } from "react";
import AllProduct from "../../components/card/AllProduct";

const Adventure = () => {
  const [target, setTarget] = useState('Popular');
  const [valueRate, setValueRate] = useState(5);
  
  const onChange = (value:any) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value:any) => {
    console.log('search:', value);
  }; 

  const onChangeRate = (e:any) => {
    setValueRate(e.target.value);
  };
  return (
    <>
     <Row gutter={16}>
        <Col span={6} style={{  }}>
        <div style={{ width:"100%", height:700,background:"white",border:"1px solid white",borderRadius:12, marginTop:20}}>
        <p style={{ fontSize:18,fontWeight:600,padding:"24px 0 0 12px " }} >
        <FontAwesomeIcon icon={faFilter} />
          Bộ lọc tìm kiếm</p>
        <Divider/>
          <div>
            <p style={{ fontSize:16,fontWeight:600,padding:"0 0 12px 12px " }}>Đánh giá</p>
            <Radio.Group
            style={{ display: 'flex',flexDirection: 'column', gap: 8, paddingLeft:20}}
                onChange={onChangeRate}
                value={valueRate}
                options={[
                  {
                    value: 5,
                    label: (
                      <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                      </span>
                    ),
                  },
                  {
                    value: 4,
                    label: (
                      <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow",paddingRight:6 }} />
                        trở lên
                      </span>
                    ),
                  },
                  {
                    value: 3,
                    label: (
                      <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow",paddingRight:6 }} />
                        trở lên
                      </span>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow",paddingRight:6 }} />
                        trở lên
                      </span>
                    ),
                  },
                  {
                    value: 1,
                    label: (
                      <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow",paddingRight:6 }} />
                        trở lên
                      </span>
                    ),
                  }
                ]}
              />
          </div>
        </div>
        </Col>
        <Col span={18} style={{}}>
        <div style={{ width:"100%", height:70,background:"white",border:"1px solid white",borderRadius:12, marginTop:20,display:"flex",alignItems:"center"}}>
          <p style={{ fontSize:18,fontWeight:600,padding:"0 12px" }} >Sắp xếp theo:</p>
          <Radio.Group value={target} onChange={(e) => setTarget(e.target.value)}>
            <Radio.Button value="Popular">Phổ biến</Radio.Button>
            <Radio.Button value="Latest">Mới nhất</Radio.Button>
            <Radio.Button value="bestseller">Bán chạy</Radio.Button>
          </Radio.Group>
          <Select style={{ paddingLeft:12,minWidth:240 }}
              showSearch
              placeholder="Sắp xếp theo..."
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: 'mintomax',
                  label: 'Giá từ thấp đến cao',
                },
                {
                  value: 'maxtomin',
                  label: 'Giá từ cao đến thấp',
                },
              ]}
            />
        </div>
        <div style={{ width:"100%", height:1300,background:"white",border:"1px solid white",borderRadius:12, marginTop:20}}>
          <AllProduct/>
        </div>

        </Col>
      </Row>
        
    </>
  )
};

export default Adventure;
