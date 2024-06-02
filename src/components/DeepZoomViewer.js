import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import "openseadragon-filtering";
import OpenSeadragonImagingHelper from "@openseadragon-imaging/openseadragon-imaginghelper";

import { Row, Col } from "react-bootstrap";

const DeepZoomViewer = ({ tileSources, zoomLevel, xCoord, yCoord, annotDetArr }) => {
  const viewerRef = useRef();


  const [viewer, setViewer] = useState(null); // Define the viewer state variable here 

  const [zoomLevelView, setZoomLevelView] = useState();
  const [viewportHeight, setViewportHeight] = useState();
  const [viewportWidth, setViewportWidth] = useState();

  const [zoomLevelMain, setZoomLevelMain] = useState(zoomLevel);
  const [xCoordMain, setXCoordMain] = useState(xCoord);
  const [yCoordMain, setYCoordMain] = useState(yCoord);


  const [gamma, setGamma] = useState(1);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);




  useEffect(() => {


    const viewer = OpenSeadragon({
      id: "viewer",
      prefixUrl:
        "https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/images/",
      //   tileSources: tileSources,
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomImageRatio: 1,
      visibilityRatio: 1,
      zoomPerScroll: 2,
      maxZoomLevel: 128,
      minZoomLevel: 1,
      ajaxWithCredentials: false, // Add this line
      crossOriginPolicy: "Anonymous", // And this line
      // toolbar:       "toolbarDiv"   
      showNavigator: true
    });

    // new OpenSeadragon.DraggableNavigator({
    //   viewer: viewer,
    // });
    // viewer.setNavigatorDraggable(true);

    viewer.addHandler("open", function () {

      viewer.viewport.zoomTo(zoomLevel);
      viewer.viewport.panTo(new OpenSeadragon.Point(xCoord, yCoord));
      viewer.forceRedraw();

    });

    // viewer.setNavigatorDraggable(true)

    viewer.addHandler("open", function () {
      var getTileUrl = viewer.source.getTileUrl;

      viewer.source.getTileUrl = function () {
        return getTileUrl.apply(this, arguments) + "?v=" + "261d9b83";
      };

      // viewer.setNavigatorDraggable(true);
    });

    // let image = {
    //   Image: {
    //     Format: "jpeg",
    //     Overlap: 1,
    //     Size: { Height: 38144, Width: 51200 },
    //     TileSize: 510,
    //     Url: "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/hamamatsu/cmu-1/slide_files/",
    //     xmlns: "http://schemas.microsoft.com/deepzoom/2008",
    //   },
    //   crossOriginPolicy: false,
    //   ajaxWithCredentials: false,
    //   useCanvas: true,
    // };
    // let image = {"Image":{"Format":"jpeg","Overlap":1,"Size":{"Height":38144,"Width":51200},"TileSize":510,"Url":"http://127.0.0.1:5000/tile/","xmlns":"http://schemas.microsoft.com/deepzoom/2008"},"crossOriginPolicy":false,"ajaxWithCredentials":false,"useCanvas":true}
    // let image = {"Image":{"Format":"jpeg","Overlap":1,"Size":{"Height":61440,"Width":60928},"TileSize":510,"Url":"http://127.0.0.1:5000/tile/","xmlns":"http://schemas.microsoft.com/deepzoom/2008"},"crossOriginPolicy":false,"ajaxWithCredentials":false,"useCanvas":true}
    let image = { "Image": { "Format": "jpeg", "Overlap": 1, "Size": { "Height": 61440, "Width": 60928 }, "TileSize": 510, "Url": "http://127.0.0.1:5000/tile/", "xmlns": "http://schemas.microsoft.com/deepzoom/2008" }, "crossOriginPolicy": false, "ajaxWithCredentials": false, "useCanvas": true }
    // let image = {"Image":{"Format":"jpeg","Overlap":1,"Size":{"Height":596,"Width":800},"TileSize":510,"Url":"http://127.0.0.1:5000/tile/","xmlns":"http://schemas.microsoft.com/deepzoom/2008"},"crossOriginPolicy":false,"ajaxWithCredentials":false,"useCanvas":true}

    const anno = Annotorious(viewer, {});

    // viewer.setNavigatorDraggable(true);

    anno.on('deleteAnnotation', async (annotation) => {
      // console.log(annotation);
      anno.removeAnnotation(annotation.id);
      await onFetchData('http://127.0.0.1:5000/deleteAnnotation', 'POST', { id: annotation.id })
    });

    anno.on("createAnnotation", async function (annotation) {
      console.log(annotation);
      await onFetchData('http://127.0.0.1:5000/getAnnotation', 'POST', annotation)

    });

    for (var i in annotDetArr) {

      anno.addAnnotation({
        "@context": "http://www.w3.org/ns/anno.jsonld",
        id: annotDetArr[i].id,
        type: "Annotation",
        body: {
          type: "TextualBody",
          value: "This is a default annotation",
          format: "text/plain",
        },
        target: {
          source: "http://example.com/image.jpg", // Replace with your image URL
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            // value: "xywh=pixel:5000,5000,4000,4000", // Replace with your annotation coordinates
            value: annotDetArr[i].xywh, // Replace with your annotation coordinates
          },
        },
      });
    }


    viewer.addOverlay({
      id: "example-overlay",
      x: 0.33,
      y: 0.75,
      width: 0.2,
      height: 0.25,
      className: "highlight",
    });



    // var imagingHelper = viewer.activateImagingHelper({
    //   onImageViewChanged: onImageViewChanged,
    // });

    viewer.activateImagingHelper({
      onImageViewChanged: onImageViewChanged,
    });

    function onImageViewChanged(event) {

      setZoomLevelView(event.zoomFactor.toFixed(2));
      setViewportHeight(event.viewportWidth.toFixed(2));
      setViewportWidth(event.viewportHeight.toFixed(2));
      setXCoordMain(event.viewportCenter.x);
      setYCoordMain(event.viewportCenter.y);

    }

    viewer.open(image);

    setViewer(viewer);

  }, [tileSources]);

  const getSavedAnnotation = async () => {
    let savedData = await onFetchData('http://127.0.0.1:5000/getSavedAnnotation', 'GET',)
    return savedData;
  };

  const onFetchData = async (path, mthod, body) => {
    //write code for fetching data from server based on
    return new Promise((resolve, reject) => {

      fetch(path, {
        method: mthod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation: ', error);
          reject(error);
        });

    })
  }

  const updateFilterBrigtness = (filterObj) => {
    setBrightness(filterObj.target.value);
    viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };
  const updateFilterContrast = (filterObj) => {
    setContrast(filterObj.target.value);
    viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };
  const updateFilterGamma = (filterObj) => {
    setGamma(filterObj.target.value);
    viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };

  //write a similart method for saturation
  const updateFilterSaturation = (filterObj) => {
    setSaturation(filterObj.target.value);
    viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  };

  const resetFilters = function () {
    setBrightness(100);
    setContrast(100);
    setGamma(1);
    setSaturation(100);
    viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  };







  return (
    <div>


      <div style={{ display: "flex" }}>
        <div
          id="viewer"
          ref={viewerRef}
          style={{ width: "800px", height: "600px" }}
        />


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0.8rem",
            width: "200px",
          }}
        >
          <button className="btn btn-primary" onClick={resetFilters}>
            Reset
          </button>
          <label>
            Brightness
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={updateFilterBrigtness}
              tooltip="true"
              class="form-range"
            />
          </label>
          <label>
            Contrast
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={updateFilterContrast}
              class="form-range"
            />
          </label>
          <label>
            Gamma
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={gamma}
              onChange={updateFilterGamma}
              class="form-range"
            />
          </label>
          <label>
            Saturation
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={updateFilterSaturation}
              class="form-range"
            />
          </label>
          <Row className="info-strip">
            <Col>zoomLevel : {zoomLevelView}</Col>
            <Col>viewport Height: {viewportHeight}</Col>
            <Col>viewport Width: {viewportWidth}</Col>
            <Col>xCoord: {xCoordMain}</Col>
            <Col>yCoord: {yCoordMain}</Col>
          </Row>
          {/* <button className="btn btn-primary" onClick={onZoomPress}>
            Navigate to concerned part
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DeepZoomViewer;
