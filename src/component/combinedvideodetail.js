import React from 'react';

function CombinedVideoDetail({ combinedVideo, height, width}) {
  return (
    <div className="video-segment-box">
      <div className={`segmented-video`}>
        <video controls height={height} width={width}>
          <source src={combinedVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default CombinedVideoDetail;