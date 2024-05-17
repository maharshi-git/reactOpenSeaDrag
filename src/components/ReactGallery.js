import React from 'react';

import imagereport from "../resources/test.jpg";

import { ImageListItem, ImageList } from '@mui/material';

const ReactGallery = () => {
    const images = [
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport,
        imagereport
        // Add more image URLs here
    ];

    return (
        <ImageList sx={{ width: "70rem", height: "40rem" }} cols={3} rowHeight={164}>
            {images.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={item}
                        alt={item.title}
                        loading="lazy"
                        style={{
                            width: '100%',  // make the image take up the full width of the box
                            height: '100%',  // make the image take up the full height of the box
                            objectFit: 'cover',  // make the image cover the entire box
                          }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default ReactGallery;
