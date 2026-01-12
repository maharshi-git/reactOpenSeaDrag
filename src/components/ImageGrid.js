const ImageGrid = () => {
    const images = [
      "http://127.0.0.1:5000/tile/Maharshi/4525/16/60_50.jpeg",
      "http://127.0.0.1:5000/tile2/Maharshi/4007/13/36050_4673.jpeg",
      // "http://127.0.0.1:5000/tile/Maharshi/4007/11/2_0.jpeg",
      // "http://127.0.0.1:5000/tile/Maharshi/4007/10/0_1.jpeg",
      // "http://127.0.0.1:5000/tile/Maharshi/4007/10/1_1.jpeg",
    ];
  
    return (
      
      <div className="grid grid-cols-4 gap-2 w-64 h-64">
        <div>test</div>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
        ))}
      </div>
    );
  };
  
  export default ImageGrid;

  // const ImageGrid = () => {
  //   const images = Array(16).fill("https://via.placeholder.com/150");
  
  //   return (
  //     <div className="grid grid-cols-4 gap-2 w-64 h-64">
  //       {images.map((src, index) => (
  //         <img key={index} src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
  //       ))}
  //     </div>
  //   );
  // };
  
  // export default ImageGrid;
  