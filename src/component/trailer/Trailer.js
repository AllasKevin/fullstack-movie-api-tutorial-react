import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
const Trailer = () => {
  let params = useParams();
  const key = params.ytTrailerId;

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          className="react-player"
          controls
          playing
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height={"90vh"}
        />
      ) : null}
    </div>
  );
};

export default Trailer;
