import React, { useState } from "react";

import imagereport from "../resources/Roles 5.jpg";

import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const SuspectedTileViewer = ({ onZoomPress, updateFilterBrigtness, updateFilterContrast, updateFilterGamma }) => {
  //api call to get coordinates of selected file from the server

  // const [toggleValueSlides, setToggleValueSlides] = useState(1);
  // const [toggleValueImage, setToggleValueImage] = useState(0);
  const [toggleValue, setToggleValue] = useState("affected");

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
  const [itemsPerPage] = useState(15);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);

  const handleImageClick = (zoom, x, y) => {
    // console.log(`Clicked on image: ${src}`);
    onZoomPress(zoom, x, y, 0.5);
  };

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(images.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (val) => {
    setToggleValue(val);
  };

  const updateFilterBrigtness2 = (oEvent) =>{
    updateFilterBrigtness(oEvent)
  }

  const updateFilterContrast2 = (oEvent) => {
    updateFilterContrast(oEvent);
  }

  const updateFilterGamma2 = (oEvent) => {
    updateFilterGamma(oEvent)
  }

  return (
    <div className="container">
      <ToggleButtonGroup
        type="radio"
        name="options"
        value={toggleValue}
        onChange={handleChange}
        style={{marginLeft: "0.8rem", marginBottom: "1rem", width: "100%"}}
      >
        <ToggleButton id="toggle-check" value={"affected"}>
          Affected Slides
        </ToggleButton>
        <ToggleButton id="toggle-check2" value={"adjust"}>
          Adjust Slides
        </ToggleButton>
      </ToggleButtonGroup>

      <div
        className="container"
        style={{ display: toggleValue === "adjust" ? "none" : "block" }}
      >
        <div className="row">
          {currentItems.map((image, index) => (
            <div key={index} className="col-md-4 mb-4">
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
          <ul className="pagination">
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
          </ul>
        </nav>
      </div>
      <div
        className="mt-3"
        style={{ display: toggleValue === "adjust" ? "block" : "none" }}
      >
        <div style={{display: "flex", flexDirection: "column", marginLeft: "0.8rem"}}>
          <label>
            Brightness
            <input
              type="range"
              min="0"
              max="200"
              // value={brightness}
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
              // value={contrast}
              onChange={updateFilterContrast2}
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
              // value={gamma}
              onChange={updateFilterGamma2}
              class="form-range"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SuspectedTileViewer;
