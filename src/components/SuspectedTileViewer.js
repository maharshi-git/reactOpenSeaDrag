import React, { useState, useEffect } from "react";

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

  const [annotArr, setAnnotArr] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const path = 'http://localhost:5000/getSavedAnnotation'; // Replace with your API path
      const method = 'GET'; // Replace with your method
      const body = {}; // Replace with your body

      try {
        const response = await fetch(path, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const annotDet = await response.json();
        // setData(data);


        let annotDetArr = []
        let xywh
        for (var i = 0; i < annotDet.length; i++) {
          xywh = `xywh=pixel:${annotDet[i].coordinates.x},${annotDet[i].coordinates.y},${annotDet[i].coordinates.width},${annotDet[i].coordinates.height}`
          annotDetArr.push(xywh);
        }
        setAnnotArr(annotDetArr);

      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    };

    fetchData();
  }, []);

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
    // loadAnnotation();loadAnnotation
    setZoomLevel(zoom);
    setXCoord(x);
    setYCoord(y);
    setShow(true);
  };

  // const loadAnnotation = async () => {
  //   //api call to get coordinates of selected file from the server
  //   let annotDet = await onFetchData("http://localhost:5000/getSavedAnnotation", "GET", {});
  //   let annotDetArr = []
  //   let xywh
  //   for (var i = 0; i < annotDet.length; i++) {
  //     xywh = `xywh=pixel:${annotDet[i].coordinates.x},${annotDet[i].coordinates.y},${annotDet[i].w},${annotDet[i].h}`
  //     annotDetArr.push(xywh);
  //   }
  //   setAnnotArr(annotDetArr);
  //   // let 

  // }

  // const onFetchData = async (path, mthod, body) => {
  //   //write code for fetching data from server based on
  //   return new Promise((resolve, reject) => {

  //     fetch(path, {
  //       method: mthod,
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(body)
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         resolve(data);
  //       })
  //       .catch(error => {
  //         console.error('There was a problem with the fetch operation: ', error);
  //         reject(error);
  //       });

  //   })
  // }

  // loadAnnotation();



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
          <DeepZoomViewer zoomLevel={zoomLevel} xCoord={xCoord} yCoord={yCoord} annotDetArr={annotArr}></DeepZoomViewer>
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
            style={{ height: "80vh" }}

          />
        </div>
      </div>

    </div>
  );
};

export default SuspectedTileViewer;
