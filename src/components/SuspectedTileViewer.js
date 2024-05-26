import React, { useState, useEffect, useRef } from "react";

import imagereport from "../resources/test.jpg";
import homeIcon from "../resources/icons/home (1).png";
import gridIcon from "../resources/icons/menu.png";
import { Modal } from 'react-bootstrap';
import DeepZoomViewer from "./DeepZoomViewer";
// import Slider from '@mui/material/Slider';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import Draggable from 'react-draggable';


import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import zIndex from "@mui/material/styles/zIndex";


const SuspectedTileViewer = () => {
  //api call to get coordinates of selected file from the server

  const childRef = useRef();

  const [slidesClass, setSlidesClass] = useState("col-md-3");
  const [show, setShow] = useState(false);

  const [zoomLevel, setZoomLevel] = useState();
  const [xCoord, setXCoord] = useState();
  const [yCoord, setYCoord] = useState();

  const [annotArr, setAnnotArr] = useState([]);
  const [annotArrNDPI, setAnnotArrNDPI] = useState([]);
  const [data, setData] = useState(null);

  const [showDragonView, setShowDragonView] = useState(false);
  const [selectedAnnotaiton, setSelectedAnnotation] = useState(null);



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
        let xywh, id
        for (var i = 0; i < annotDet.length; i++) {
          xywh = `xywh=pixel:${annotDet[i].coordinates.x},${annotDet[i].coordinates.y},${annotDet[i].coordinates.width},${annotDet[i].coordinates.height}`
          id = annotDet[i].id
          let annotObj = {
            xywh: xywh,
            id: id

          }

          annotDetArr.push(annotObj);
        }
        setAnnotArr(annotDetArr);

      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    };

    const fetchDataAnnotation = async () => {
      const path = 'http://localhost:5000/tileSlide'; // Replace with your API path
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

        console.log(annotDet);
        setAnnotArrNDPI(annotDet.annotations.ndpviewstate);

      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    }

    fetchData();
    fetchDataAnnotation();
  }, []);

  let images = []
if(annotArrNDPI.length > 0){
  images = [
    { src: `http://localhost:5000/get-image/${annotArrNDPI[0]['@id']}`, alt: "Image 1", zoom: 2, x: 0.5, y: 0.5, annotation: 'somethig is not right' },
    { src: imagereport, alt: "Image 2", zoom: 6, x: 0.7, y: 0.2, annotation: 'somethig is surely not right' },
    { src: imagereport, alt: "Image 3", zoom: 4, x: 0.3, y: 0.4, annotation: 'Horrible stuff' },
    { src: imagereport, alt: "Image 4", zoom:128, x: 0.5, y: 0.5 },
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
}

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);

  const handleClose = () => {
    setShow(false);
    fetchData();
  }



  const handleImageClick = (zoom, x, y, annotation) => {
    // loadAnnotation();loadAnnotation
    setSelectedAnnotation(annotation)
    setShowDragonView(true)
    setZoomLevel(zoom);
    setXCoord(x);
    setYCoord(y);
    // setShow(true);
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


  // const onChangeItemsPerPage = function (event) {
  const onChangeItemsPerPage = function (inputVlue) {
    // return "test"
    switch (inputVlue) {
      case 1:
        setItemsPerPage(1);
        setSlidesClass("col-md-12");
        break;
      case 4:
        setItemsPerPage(4);
        setSlidesClass("col-md-6");
        break;
      case 9:
        setItemsPerPage(9);
        setSlidesClass("col-md-4");
        break;
      case 16:
        setItemsPerPage(16);
        setSlidesClass("col-md-3");
        break;
      default:
        setItemsPerPage(16);
        setSlidesClass("col-md-3");
        break;
    }
    // setItemsPerPage(event.target.value);
  }

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
      let xywh, id
      for (var i = 0; i < annotDet.length; i++) {
        xywh = `xywh=pixel:${annotDet[i].coordinates.x},${annotDet[i].coordinates.y},${annotDet[i].coordinates.width},${annotDet[i].coordinates.height}`
        id = annotDet[i].id
        let annotObj = {
          xywh: xywh,
          id: id

        }

        annotDetArr.push(annotObj);
      }
      setAnnotArr(annotDetArr);

    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };

  return (
    <div className="container">


      {/* <Modal show={show} onHide={handleClose} fullscreen={false} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>OpenSeadragon Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeepZoomViewer zoomLevel={zoomLevel} xCoord={xCoord} yCoord={yCoord} annotDetArr={annotArr}></DeepZoomViewer>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal> */}

      <Draggable >
        <div className="dialogBox" style={{position: "absolute", top: "50%", zIndex:"1000", transform: "translate(-50%, -50%)"}}>
          This dialog box can be dragged around.
        </div>
      </Draggable>


      <div style={{ display: "flex" }}>
        <div>
          <SideNav
            onSelect={(selected) => {
              // Add your code here
            }}
            style={{ background: "#1976d2" }}>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  {/* <i src={homeIcon} className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                  <img src={homeIcon} style={{ fontSize: '1rem', width: "2rem", color: "white" }} />
                </NavIcon>
                <NavText>
                  Home
                </NavText>
              </NavItem>
              <NavItem eventKey="changeDimension">
                <NavIcon>
                  {/* <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> */}
                  <img src={gridIcon} style={{ fontSize: '1rem', width: "2rem", color: "white" }} />
                </NavIcon>
                <NavText>
                  Adjust Dimension
                </NavText>
                <NavItem eventKey="charts/linechart">
                  <NavText>
                    <button onClick={() => { onChangeItemsPerPage(1) }} className="btn btn-primary">1x1</button>
                    <button onClick={() => { onChangeItemsPerPage(4) }} className="btn btn-primary">2x2</button>
                    <button onClick={() => { onChangeItemsPerPage(9) }} className="btn btn-primary">3x3</button>
                    <button onClick={() => { onChangeItemsPerPage(16) }} className="btn btn-primary">4x4</button>
                  </NavText>
                </NavItem>
                <NavItem eventKey="charts/barchart">
                  <NavText>
                    Adjust image
                  </NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </div>
        <div
          className="container"
        >
          <div className="row" >
            {currentItems.map((image, index) => (
              <div id="tileViewer" key={index} className={slidesClass}>
                <div className="card">
                  <button
                    style={{ border: "none", padding: 0, marginLeft: "-20px" }}
                    onClick={() => handleImageClick(image.zoom, image.x, image.y, image.annotation)}
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
            {/* <div style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '50%',
              height: '80%',
              backgroundColor: '#f0f0f0', // Change this to the desired background color
            }}>
              <DeepZoomViewer zoomLevel={zoomLevel} xCoord={xCoord} yCoord={yCoord} annotDetArr={annotArr}></DeepZoomViewer>
            </div> */}
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
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={showDragonView}
          
          title={selectedAnnotaiton}
          // subtitle="Optional subtitle."
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setShowDragonView(false);
          }}
        >
          <DeepZoomViewer ref={childRef} zoomLevel={zoomLevel} xCoord={xCoord} yCoord={yCoord} annotDetArr={annotArr}></DeepZoomViewer>
        </SlidingPane>
      </div>

    </div>
  );
};

export default SuspectedTileViewer;
