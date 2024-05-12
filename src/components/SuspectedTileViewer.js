import React, { useState, useEffect } from "react";

import imagereport from "../resources/Roles 5.jpg";
import { Button, Modal } from 'react-bootstrap';
import DeepZoomViewer from "./DeepZoomViewer";
import Slider from '@mui/material/Slider';


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

  // useEffect(() => {
  //   const handleScroll = (event) => {

  //     console.log('hello')
  //     if (event.deltaY < 0) {
  //       // Scrolling up, increase the number of items per page
  //       // setItemsPerPage((prevItemsPerPage) => Math.min(prevItemsPerPage + 1, images.length));
  //       changeScreen("-")
  //     } else {
  //       // Scrolling down, decrease the number of items per page
  //       // setItemsPerPage((prevItemsPerPage) => Math.max(prevItemsPerPage - 1, 1));
  //       changeScreen("+")
  //     }
  //   };

  //   window.addEventListener('wheel', handleScroll);

  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, [images.length]);


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

  const onChangeItemsPerPage = function (event) {
    // return "test"
    switch (event.target.value) {
      case 4:
        setItemsPerPage(1);
        setSlidesClass("col-md-12");
        break;
      case 8:
        setItemsPerPage(4);
        setSlidesClass("col-md-6");
        break;
      case 12:
        setItemsPerPage(9);
        setSlidesClass("col-md-4");
        break;
      case 16:
        setItemsPerPage(16);
        setSlidesClass("col-md-3");
        break;
      default:
        break;
    }
    // setItemsPerPage(event.target.value);
  }

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


      <div style={{ display: "flex" }}>
        <div
          className="container"
        >
          <div className="row" >
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
        <div >
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: 'slider-vertical',
              },
            }}
            orientation="vertical"
            defaultValue={itemsPerPage}
            aria-label="Temperature"
            valueLabelDisplay="auto"
            max={16}
            min={4}
            step={4}
            onChange={onChangeItemsPerPage}
            style={{ height: "80vh"}}
          // onKeyDown={preventHorizontalKeyboardNavigation}
          />
        </div>
      </div>

    </div>
  );
};

export default SuspectedTileViewer;
