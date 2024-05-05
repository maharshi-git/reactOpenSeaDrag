import React, { useState } from "react";

import DeepZoomViewer from "./DeepZoomViewer";

import SuspectedTileViewer from "./SuspectedTileViewer";
import OpenSeadragon from "openseadragon";

import { Row, Col } from "react-bootstrap";

// import SideMenu from './components/SideMenu';

function DeepZoomMain() {
  const [viewer, setViewer] = useState();
  const [zoomLevel, setZoomLevel] = useState();
  const [viewportHeight, setViewportHeight] = useState();
  const [viewportWidth, setViewportWidth] = useState();
  const [viewrportcenter, setViewportCenter] = useState({x: 0, y: 0});
  const [viewportOrigin, setViewportOrigin] = useState({x: 0, y: 0});

  


  const onZoomPress = (zoomLevel, xCoord, yCoord) => {
    console.log(zoomLevel, xCoord, yCoord);
    // viewer.viewport.zoomTo(2);
    // viewer.viewport.panTo(new OpenSeadragon.Point(0.5, 0.5));
    viewer.viewport.zoomTo(zoomLevel);
    viewer.viewport.panTo(new OpenSeadragon.Point(xCoord, yCoord));
    viewer.forceRedraw();
  };

  const imgHelperValues = (obj) => {
    setZoomLevel(obj.zoomFactor.toFixed(2));
    setViewportHeight(obj.viewportHeight.toFixed(2));
    setViewportWidth(obj.viewportWidth.toFixed(2));
    setViewportCenter(obj.viewportCenter);
    setViewportOrigin(obj.viewportOrigin);

  };

  const updateFilterBrigtness = (filterObj) => {
  
    viewer.canvas.style.filter = `brightness(${filterObj.brightness}%) contrast(${filterObj.contrast}%)`;
    
  };
  const updateFilterContrast = (filterObj) => {
    
    viewer.canvas.style.filter = `brightness(${filterObj.brightness}%) contrast(${filterObj.contrast}%)`;
    
  };
  const updateFilterGamma = (oEvent) => {
    
    viewer.canvas.style.filter = `gamma(${oEvent.target.value}%)`;
    
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
          <DeepZoomViewer
            setViewer2={setViewer}
            imgHelperValues={imgHelperValues}
          />
          <Row className="info-strip">
            <Col>zoomLevel : {zoomLevel}</Col>
            <Col>viewport Height: {viewportHeight}</Col>
            <Col>viewport Width: {viewportWidth}</Col>
            <Col>
              Viewport Center
              <Col>x: {viewrportcenter.x.toFixed(2)}</Col>
              <Col>y: {viewrportcenter.y.toFixed(2)}</Col>
            </Col>
            <Col>Viewport Origin
              <Col>x: {viewportOrigin.x.toFixed(2)}</Col>
              <Col>y: {viewportOrigin.y.toFixed(2)}</Col>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );

  // );
}

export default DeepZoomMain;
