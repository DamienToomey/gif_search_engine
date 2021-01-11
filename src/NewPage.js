import React from 'react';

import './NewPage.css';

import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

function useDefaultSrc(event) {
  event.target.src = process.env.PUBLIC_URL+"/giphy-downsized-small.mp4";
}

// Why can I not access location in Class Component ???
// https://stackoverflow.com/questions/37516919/react-router-getting-this-props-location-in-child-components

const NewPage = () => {
  const location = useLocation();

  if (location.state) {
    return (
      <div className="display-big-gif">
          <video src={location.state.gif["images"]["original_mp4"]["mp4"]}
              onError={useDefaultSrc}
            type="video/mp4"
            width="300px"
            height="300px"
            autoPlay
            muted
            loop>
              Your browser does not support the video tag.
          </video>
          {location.state.gif["title"]}
      </div>
    );
  } else {
    return <Redirect 
        to={{ pathname: "/", }}
    />

  }
}

export default NewPage;