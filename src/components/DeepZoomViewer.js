import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import "openseadragon-filtering";
import OpenSeadragonImagingHelper from "@openseadragon-imaging/openseadragon-imaginghelper";

const DeepZoomViewer = ({ tileSources, slide, onZoomPress, setViewer2 }) => {
  const viewerRef = useRef();

  const [brightness, setBrightness] = useState(100);
  const [gamma, setGamma] = useState(1);
  const [contrast, setContrast] = useState(100);
  const [viewer, setViewer] = useState(null); // Define the viewer state variable here

  useEffect(() => {
    // Create the OpenSeadragon viewer

    if (!viewer) {
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
        maxZoomLevel: 8,
        minZoomLevel: 1,
        ajaxWithCredentials: false, // Add this line
        crossOriginPolicy: "Anonymous" // And this line
        // toolbar:       "toolbarDiv"
        
      });

      viewer.addOverlay({
        id: "right-arrow-overlay",
        x: 0.2008,
        y: 0.4778,
        placement: "RIGHT",
        checkResize: false,
      });

      //add a transluscent overlay to the viewer

      viewer.addHandler("open", function () {
        var getTileUrl = viewer.source.getTileUrl;

        viewer.source.getTileUrl = function () {
          return getTileUrl.apply(this, arguments) + "?v=" + "261d9b83";
        };
      });

      let image = {
        Image: {
          Format: "jpeg",
          Overlap: 1,
          Size: { Height: 38144, Width: 51200 },
          TileSize: 510,
          Url: "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/hamamatsu/cmu-1/slide_files/",
          xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        },
        crossOriginPolicy: false,
        ajaxWithCredentials: false,
        useCanvas: true,
      };
      // let image = {"Image":{"Format":"jpeg","Overlap":1,"Size":{"Height":38144,"Width":51200},"TileSize":510,"Url":"http://127.0.0.1:5000/tile/","xmlns":"http://schemas.microsoft.com/deepzoom/2008"},"crossOriginPolicy":false,"ajaxWithCredentials":false,"useCanvas":true}

      const anno = Annotorious(viewer, {});

      anno.on("createAnnotation", function (annotation) {
        console.log(annotation);

        // Send a POST request with the annotation data
        // fetch('https://your-api-endpoint.com', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(annotation)
        // });
      });

      // const annotDet = await annotationDetails() //api call to get annotation details
      // anno.addAnnotation(annotDet)

      anno.addAnnotation({
        "@context": "http://www.w3.org/ns/anno.jsonld",
        id: "anno2",
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
            value: "xywh=pixel:5000,5000,4000,4000", // Replace with your annotation coordinates
          },
        },
      });

      var imagingHelper = new OpenSeadragonImagingHelper({ viewer: viewer });
      console.log(imagingHelper);

      viewer.open(image);

      viewer.canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) gamma(${gamma})`;

      setViewer(viewer);
      setViewer2(viewer);
    }
  }, [tileSources]);

  const updateFilterBrigtness = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `brightness(${oEvent.target.value}%)`;
    setBrightness(oEvent.target.value);
  };
  const updateFilterContrast = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `contrast(${oEvent.target.value}%)`;
    setContrast(oEvent.target.value);
  };
  const updateFilterGamma = (oEvent) => {
    console.log(oEvent.target.value);
    viewer.canvas.style.filter = `gamma(${oEvent.target.value}%)`;
    setGamma(oEvent.target.value);
  };

  return (
    <div>
      <div
        id="viewer"
        ref={viewerRef}
        style={{ width: "800px", height: "600px" }}
      />
      {/* <div>
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
            style={{ marginRight: "1rem", width: "5rem" }}
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
            max="2"
            step="0.1"
            value={gamma}
            onChange={updateFilterGamma}
            class="form-range"
          />
        </label>
      </div> */}
    </div>
  );
};

export default DeepZoomViewer;
