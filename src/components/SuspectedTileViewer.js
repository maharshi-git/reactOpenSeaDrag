import React, { useState, useEffect, useRef } from "react";

import imagereport from "../resources/test.jpg";
import homeIcon from "../resources/icons/home (1).png";
import gridIcon from "../resources/icons/menu.png";
import nextIcon from "../resources/icons/next.png";
import prevIcon from "../resources/icons/arrow.png";
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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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

  const [images, setImages] = useState([])
  const [gridWidth, setGridWidth] = useState('33%')
  const [gridHeight, setGridHeight] = useState('33%')
  const [gridX, setGridX] = useState(3)
  const [gridY, setGridY] = useState(3)

  // const [itemsPerPage, setItemsPerPage] = useState(16);
  const [xsVal, setXsVal] = useState(3);


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

        let imagesArr = annotDet.Predicts.map(x => {
          return {
            src: `http://localhost:5000/get_image/${x.id}`,
            alt: "Image 1",
            zoom: 32,
            x: x.openSeaXCoord,
            y: x.openSeaYCoord,
            annotation: 'somethig is not right'

          }

        })

        setImages(imagesArr)
        console.log(annotDet);
        setAnnotArrNDPI(annotDet.Predicts);



      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    }

    fetchData();
    fetchDataAnnotation();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  const onChangeItemsPerPage2 = (param) =>{
    switch (param) {
      case 1:
        setXsVal(8);
        setItemsPerPage(1);
        break;
      case 2:
        setXsVal(6);
        setItemsPerPage(2);
        break;
      case 3:
        setXsVal(4);
        setItemsPerPage(3);
        break;
      case 4:
        setXsVal(3);
        setItemsPerPage(8);
        
        break;
      case 6:
        setXsVal(2);
        setItemsPerPage(18);
        
        break;
        case 7:
          setXsVal(2);
          setItemsPerPage(18);
          
          break;
        setXsVal(2);
        setItemsPerPage(1);
      default:
        setXsVal(3);
        setItemsPerPage(1);
        break;
    }

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

      {/* <Draggable >
        <div className="dialogBox" style={{position: "absolute", top: "50%", zIndex:"1000", transform: "translate(-50%, -50%)"}}>
          This dialog box can be dragged around.
        </div>
      </Draggable> */}


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
                    {/* <button onClick={() => { onChangeItemsPerPage(1) }} className="btn btn-primary">1x1</button>
                    <button onClick={() => { onChangeItemsPerPage(4) }} className="btn btn-primary">2x1</button>
                    <button onClick={() => { onChangeItemsPerPage(9) }} className="btn btn-primary">3x1</button>
                    <button onClick={() => { onChangeItemsPerPage(16) }} className="btn btn-primary">4x2</button>
                    <button onClick={() => { onChangeItemsPerPage(16) }} className="btn btn-primary">6x3</button> */}
                    <button onClick={() => { onChangeItemsPerPage2(1) }} className="btn btn-primary">1x1</button>
                    <button onClick={() => { onChangeItemsPerPage2(2) }} className="btn btn-primary">2x1</button>
                    <button onClick={() => { onChangeItemsPerPage2(3) }} className="btn btn-primary">3x1</button>
                    <button onClick={() => { onChangeItemsPerPage2(4) }} className="btn btn-primary">4x2</button>
                    <button onClick={() => { onChangeItemsPerPage2(6) }} className="btn btn-primary">6x3</button>
                    {/* <button onClick={() => { onChangeItemsPerPage(16) }} className="btn btn-primary">4x2</button> */}
                  </NavText>
                </NavItem>
              
              </NavItem>
              <NavItem eventKey="nextPage" onClick={() => handlePageClick(currentPage + 1)}>
                <NavIcon>
                  {/* <i src={homeIcon} className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                  <img src={nextIcon} style={{ fontSize: '1rem', width: "2rem", color: "white" }} />
                </NavIcon>
                <NavText>
                  Next Page
                </NavText>
              </NavItem>
              <NavItem eventKey="nextPage" onClick={() => handlePageClick(currentPage - 1)}>
                <NavIcon>
                  {/* <i src={homeIcon} className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                  <img src={prevIcon} style={{ fontSize: '1rem', width: "2rem", color: "white" }} />
                </NavIcon>
                <NavText>
                  Next Page
                </NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </div>
        <Grid container spacing={0} >
          {
            currentItems.map((image, index) => (
              <Grid item xs={xsVal}>
                <Item>
                  <button style={{border: "none"}} onClick={() => handleImageClick(image.zoom, image.x, image.y, image.annotation)}>
                    <img className="card-img-top" key={index} src={image.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                </Item>
              </Grid>
            ))
          }

        </Grid>
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
