import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";

import DeepZoomMain from "./components/DeepZoomMain";
import FileViewer from "./components/FileViewer";
// import React, { useEffect, useRef } from "react";

// deepzoom components
// import DeepZoomViewer from "./components/DeepZoomViewer";


//standard page features
import Toolbar from "./components/Toolbar";
// import { Button } from "react-bootstrap";
// import SuspectedTileViewer from "./components/SuspectedTileViewer";

// import SideMenu from './components/SideMenu';

// const App = () => (
function App() {
  
  // let groups;
  // const [groups, setGroups] = useState();
  // const [stamp, setStamp] = useState();
  // const [slide, setSlide] = useState();

  // useEffect( () => {
  //   if(!groups){
  //     getInfoSet();
  //   }

  // });

  // const getInfoSet = async () => {
  //   const url =
  //     "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json";

  //   let data = await fetchGet(url);
  //   // groups = data.groups;
  //   setGroups(data.groups);
  //   setStamp(data.stamp)
  //   openSlide();
  // };

  // const openSlide = async () => {
  //   if(groups){
  //     var slide = groups[4].slides[0];
  //     setSlide(slide);
  //     let url = slide.properties_url;
  //     let data = await fetchGet(url);
  //     // populate_details(slide, data);
  //   }

  // };

  // const fetchGet = (url) => {
  //   return new Promise((resolve, reject) => {

  //     fetch(url, {
  //       method: "GET",

  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         // console.error(error);
  //         console.log("Error ho gaya bhai");
  //         reject(error);
  //       });
  //   });
  // };

  return (
    //I want the toolbar to be on top of the page without affecting the existing router things
    <div> 
      <Toolbar style={{ "margin-bottom": "1rem" }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileViewer />} />
          <Route path="/about" element={<DeepZoomMain />} />
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
