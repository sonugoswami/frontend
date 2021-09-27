import React from 'react';

function Videosegment({segmentedVideos}) {
  return (
    <div className="video-segment-box">
      {
        segmentedVideos.map((item, index) => {
          return (
            <div className={`segmented-video-${index}`} key={`segmented-${index}`}>
              <video controls>
                <source src={item.video_url} type="video/mp4" />
              </video>
            </div>
          )
        })
      }
    </div>
  );
}

export default Videosegment;