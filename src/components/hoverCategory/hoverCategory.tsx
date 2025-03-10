import React, { useEffect, useState } from "react";
import { Popover, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

interface Genre{
    genreId: number,
    name: string
}

const HoverTable = () => {
    const [genres, setGenres] = useState<Genre | null>(null);
  
    const fetchGenres = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/genres`);
        const json = await response.json();
        setGenres(json.data);
        console.log(json);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
  
    useEffect(() => {
        fetchGenres();
    }, []);
  
    // Cấu hình cột cho bảng
    const columns = [
      {
        title: "Genre Name",
        dataIndex: "name",
        key: "name",
      },
    ];
    return (
        <Popover
        content={<div style={{ width:"400px", height:100,background:"white",border:"1px solid white",borderRadius:12, marginBottom:20 }}>
            <p style={{ fontSize:16,fontWeight:600,paddingRight:12 }} >Danh mục sách</p>
        </div>}
        trigger="hover"
        placement="bottom"
      >
        <div
        style={{
            color: "#787878",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: 50,
        }}
      >
        <FontAwesomeIcon icon={faList} />
        Danh mục sản phẩm
      </div>
      </Popover>
    );
};

export default HoverTable;
