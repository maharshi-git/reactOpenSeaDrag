import React, { useState } from "react";

import DeepZoomViewer from "./DeepZoomViewer";

import SuspectedTileViewer from "./SuspectedTileViewer";
import OpenSeadragon from "openseadragon";

// import SideMenu from './components/SideMenu';

function DeepZoomMain() {
  const [viewer, setViewer] = useState();

  const onZoomPress = (zoomLevel, xCoord, yCoord) => {
    console.log(zoomLevel, xCoord, yCoord);
    // viewer.viewport.zoomTo(2);
    // viewer.viewport.panTo(new OpenSeadragon.Point(0.5, 0.5));
    viewer.viewport.zoomTo(zoomLevel);
    viewer.viewport.panTo(new OpenSeadragon.Point(xCoord, yCoord));
    viewer.forceRedraw();
  };

  const updateFilterBrigtness = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `brightness(${oEvent.target.value}%)`;
    // setBrightness(oEvent.target.value);
  };
  const updateFilterContrast = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `contrast(${oEvent.target.value}%)`;
    // setContrast(oEvent.target.value);
  };
  const updateFilterGamma = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `gamma(${oEvent.target.value}%)`;
    // setGamma(oEvent.target.value);
  };

  return (
    <div className="App">
      {/* <Toolbar style={{ "margin-bottom": "1rem" }} /> */}
      {/* <SideMenu /> */}
      {/* <DeepZoomViewer tileSources="https://openseadragon.github.io/example-images/highsmith/highsmith.dzi" slide={slide}/> */}

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", margin: "1rem" }}>
          <SuspectedTileViewer
            onZoomPress={onZoomPress}
            updateFilterBrigtness={updateFilterBrigtness}
            updateFilterContrast={updateFilterContrast}
            updateFilterGamma={updateFilterGamma}
          ></SuspectedTileViewer>
        </div>

        <div style={{ marginTop: "1rem", marginRight: "1rem", border: "none" }}>
          <DeepZoomViewer setViewer2={setViewer} />
        </div>
      </div>
    </div>
  );

  // );
}

export default DeepZoomMain;
