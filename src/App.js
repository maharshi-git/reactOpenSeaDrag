import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";

// import DeepZoomMain from "./components/DeepZoomMain";
import SuspectedTileViewer from "./components/SuspectedTileViewer";
import FileViewer from "./components/FileViewer";

import ReactGallery from "./components/ReactGallery";


import "./App.css";

// import Toolbar from "./components/Toolbar";

function App() {
  return (

    <div style={{marginTop: "1rem"}}> 
      {/* <Toolbar style={{ "margin-bottom": "1rem" }} /> */}
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<FileViewer />} />
          <Route path="/about/:id" element={<SuspectedTileViewer />} />
          <Route path="/gal" element={<ReactGallery />} />
     
        </Routes>
      </BrowserRouter>
    </div>













  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<DeepZoomMain />} />
  //     <Route path="/about" element={<DeepZoomMain />} />
  //   </Routes>
  // </BrowserRouter>


    // <div className="App">
    //   <Toolbar style={{ "margin-bottom": "1rem" }} />
    //   {/* <SideMenu /> */}
    //   {/* <DeepZoomViewer tileSources="https://openseadragon.github.io/example-images/highsmith/highsmith.dzi" slide={slide}/> */}
    //   <div style={{ display: "flex" }}>
    //     <div style={{ width: "50%", margin: '1rem' }}>
    //       <SuspectedTileViewer></SuspectedTileViewer>
    //     </div>
    //     <DeepZoomViewer />
        
    //   </div>
    // </div>
  );

  // );
}

export default App;
