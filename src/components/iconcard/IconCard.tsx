interface IconCardProps {
    name: string;
    path: string;
  }
  
  const IconCard = ({ name, path }: IconCardProps) => {
    return (
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: "35%",
            overflow: "hidden",
            boxSizing: "content-box",
            background: "white",
            cursor: "pointer",
          }}
        >
          <picture>
            <img
              src={`http://localhost:8080/storage/upload/${path}`}
              style={{ height: 60, width: 60 }}
              alt={name}
            />
          </picture>
        </div>
        <p style={{ marginTop:6,fontWeight:600 }}>{name}</p>
      </div>
    );
  };
  
  export default IconCard;