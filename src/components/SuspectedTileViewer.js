import React, { useState } from "react";

import imagereport from "../resources/Roles 5.jpg";
import { Button, Modal } from 'react-bootstrap';
import DeepZoomViewer from "./DeepZoomViewer";

const SuspectedTileViewer = ({
  onZoomPress,
  updateFilterBrigtness,
  updateFilterContrast,
  updateFilterGamma,
  updateFilterSaturation,
  // onShowOSD,
}) => {
  //api call to get coordinates of selected file from the server

  // const [toggleValueSlides, setToggleValueSlides] = useState(1);
  // const [toggleValueImage, setToggleValueImage] = useState(0);
  const [toggleValue, setToggleValue] = useState("affected");

  const [gamma, setGamma] = useState(1);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  // const [slidesPerScreen, setSlidesPerScreen] = useState(16);
  const [slidesClass, setSlidesClass] = useState("col-md-3");
  const [show, setShow] = useState(false);

  const [zoomLevel, setZoomLevel] = useState();
  const [xCoord, setXCoord] = useState();
  const [yCoord, setYCoord] = useState();

  const images = [
    { src: imagereport, alt: "Image 1", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 2", zoom: 6, x: 0.7, y: 0.2 },
    { src: imagereport, alt: "Image 3", zoom: 4, x: 0.3, y: 0.4 },
    { src: imagereport, alt: "Image 4", zoom: 8, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 5", zoom: 2, x: 0.5, y: 0.5 },
    { src: "", alt: "Image 6", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 1", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 2", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 3", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 4", zoom: 2, x: 0.5, y: 0.5 },
    { src: imagereport, alt: "Image 5" },
    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },
    { src: "", alt: "Image 6" },
    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },

    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },
    { src: "", alt: "Image 6" },
    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },
    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },
    { src: "", alt: "Image 6" },
    { src: imagereport, alt: "Image 1" },
    { src: imagereport, alt: "Image 2" },
    { src: imagereport, alt: "Image 3" },
    { src: imagereport, alt: "Image 4" },
    { src: imagereport, alt: "Image 5" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);


  const handleClose = () => setShow(false);

  const handleImageClick = (zoom, x, y) => {
    // console.log(`Clicked on image: ${src}`);
    // onShowOSD(true);
    // setItemsPerPage(16);
    // setSlidesClass("col-md-4");
    // onZoomPress(zoom, x, y, 0.5);
    // setZoomLevel(obj.zoomFactor.toFixed(2));
    // setViewportHeight(obj.viewportHeight.toFixed(2));
    // setViewportWidth(obj.viewportWidth.toFixed(2));

    setZoomLevel(zoom);
    setXCoord(x);
    setYCoord(y);

    setShow(true);

  };

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(images.length / itemsPerPage)
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(images.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (val) => {
    setToggleValue(val);
  };

  const updateFilterBrigtness2 = (oEvent) => {
    setBrightness(oEvent.target.value);

    let filterObj = {
      brightness: oEvent.target.value,
      contrast: contrast,
      gamma: gamma,
      saturation: saturation,
    };

    updateFilterBrigtness(filterObj);
  };

  const updateFilterContrast2 = (oEvent) => {
    setContrast(oEvent.target.value);
    let filterObj = {
      brightness: brightness,
      contrast: oEvent.target.value,
      gamma: gamma,
      saturation: saturation,
    };
    updateFilterContrast(filterObj);
  };

  const updateFilterGamma2 = (oEvent) => {
    setGamma(oEvent.target.value);
    let filterObj = {
      brightness: brightness,
      contrast: contrast,
      gamma: oEvent.target.value,
      saturation: saturation,
    };
    updateFilterGamma(filterObj);
  };

  //write a similar function for saturation
  const updateFilterSaturation2 = (oEvent) => {
    setSaturation(oEvent.target.value);
    let filterObj = {
      brightness: brightness,
      contrast: contrast,
      gamma: gamma,
      saturation: oEvent.target.value,
    };
    updateFilterSaturation(filterObj);
  };

  const resetFilters = function () {
    setBrightness(100);
    setContrast(100);
    setGamma(1);
    setSaturation(100);
    let filterObj = {
      brightness: 100,
      contrast: 100,
      gamma: 1,
      saturation: 100,
    };
    updateFilterBrigtness(filterObj);
  };

  const changeScreen = (param) => {
    if (param === "+") {
      // setSlidesPerScreen(slidesPerScreen + 1);
      // slidesClass
      switch (itemsPerPage) {
        case 1:
          setItemsPerPage(4);
          setSlidesClass("col-md-6");
          break;
        case 4:
          setItemsPerPage(9);
          setSlidesClass("col-md-4");
          break;
        case 9:
          setItemsPerPage(16);
          setSlidesClass("col-md-3");
          break;
        default:
          break;
      }
      // col-md-3
    } else {
      switch (itemsPerPage) {
        case 16:
          setItemsPerPage(9);
          setSlidesClass("col-md-4");
          break;
        case 9:
          setItemsPerPage(4);
          setSlidesClass("col-md-6");
          break;
        case 4:
          setItemsPerPage(1);
          setSlidesClass("col-md-12");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="container">


      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>OpenSeadragon Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeepZoomViewer zoomLevel={zoomLevel} xCoord={xCoord} yCoord={yCoord} ></DeepZoomViewer>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

      <div
        className="container"
        style={{ display: toggleValue === "adjust" ? "none" : "block" }}
      >
        <div className="row">
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
              onClick={() => changeScreen("-")}
            >
              -
            </button>
            <p>{itemsPerPage}</p>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
              onClick={() => changeScreen("+")}
            >
              +
            </button>
          </div>
          {currentItems.map((image, index) => (
            <div id="tileViewer" key={index} className={slidesClass}>
              <div className="card">
                <button
                  style={{ border: "none", padding: 0 }}
                  onClick={() => handleImageClick(image.zoom, image.x, image.y)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="card-img-top"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <nav>
          <div style={{ overflow: "auto" }}>
            <ul className="pagination">
              <li className="page-item">
                <a
                  onClick={() => handlePageClick(currentPage - 1)}
                  className="page-link"
                  disabled={currentPage === 1}
                >
                  Previous
                </a>
              </li>
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <a
                    onClick={() => handlePageClick(number)}
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a
                  onClick={() => handlePageClick(currentPage + 1)}
                  className="page-link"
                  disabled={currentPage === pageNumbers.length}
                >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className="mt-3"
        style={{ display: toggleValue === "adjust" ? "block" : "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0.8rem",
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
              onChange={updateFilterBrigtness2}
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
              onChange={updateFilterContrast2}
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
              onChange={updateFilterGamma2}
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
              onChange={updateFilterSaturation2}
              class="form-range"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SuspectedTileViewer;
