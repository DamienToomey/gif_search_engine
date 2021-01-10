import React from 'react';

import { useLocation } from "react-router-dom";

import {
  Redirect,
} from "react-router-dom";

function addDefaultSrc(event) {
  event.target.src = process.env.PUBLIC_URL+"/giphy-downsized-small.mp4";
}

// Why can I not access location in Class Component ???
const NewPage = () => {
  const location = useLocation();

  if (location.state) {
    return (
      <div className="d-flex flex-column align-items-center" style={{padding: "50px"}}>
        <span style={{marginBottom: "10px"}}>
                <video src={location.state.gif["images"]["original_mp4"]["mp4"]}
              onError={addDefaultSrc}
            type="video/mp4" width="300px" height="300px" autoPlay muted loop>Your browser does not support the video tag.</video>
        </span>
          {location.state.gif["title"]}
      </div>
    );
  } else {
    return <Redirect
        to={{ pathname: "/", }}
    />

  }
  
}
//https://stackoverflow.com/questions/37516919/react-router-getting-this-props-location-in-child-components

export default NewPage;