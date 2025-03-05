interface imageCardProps {
    path: string;
  }
  
  const ImageCard = ({path }: imageCardProps) => {
    return (
        <div
          style={{
            cursor:"pointer",

          }}
        >
          <picture>
            <img
              src={`http://localhost:8080/storage/upload/${path}`}
              style={{ height: 200, width: 300,border:"1px solid white",padding:"0 4px",
                borderRadius:12}}
            />
          </picture>
        </div>
    );
  };
  
  export default ImageCard;