import React, { useState } from "react";

import imagereport from "../resources/Roles 5.jpg";
import { Modal } from 'react-bootstrap';
import DeepZoomViewer from "./DeepZoomViewer";
import Slider from '@mui/material/Slider';


const SuspectedTileViewer = () => {
  //api call to get coordinates of selected file from the server

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
    { src: imagereport, alt: "Image 6", zoom: 2, x: 0.5, y: 0.5 },
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
                    style={{ border: "none", padding: 0, marginLeft: "-20px" }}
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
         
          />
        </div>
      </div>

    </div>
  );
};

export default SuspectedTileViewer;
