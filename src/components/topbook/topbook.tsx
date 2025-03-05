interface TopBookProps {
    name: string;
    path: string;
  }
  
  const TopBookProps = ({ name, path }: TopBookProps) => {
    return (
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div
          style={{
            cursor:"pointer"
          }}
        >
          <picture>
            <img
              src={`http://localhost:8080/storage/upload/${path}`}
              style={{ height: 100, width: 100 }}
              alt={name}
            />
          </picture>
        </div>
        <p style={{ marginTop:6,fontWeight:600 }}>{name}</p>
      </div>
    );
  };
  
  export default TopBookProps;