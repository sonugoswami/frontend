import React, { useState } from 'react';
import { settingsOptions, API_URL } from '../contants';
import { urlValidater } from '../functions';
import Videosegment from './videosegment';
import Combinevideo from './combinevideo';
import './index.css';

function Dashboard() {
  const [ videoLink, setVideoLink ] = useState('');
  const [ segmentSetting, setsegmentSetting ] = useState('');
  const [ intervalDuration, setintervalDuration ] = useState(1);
  const [ segmentedVideos, setsegmentedVideos ] = useState([]);

  function processInterval() {
    return fetch(`${API_URL}process-interval`,
      {
      method: "POST",
      body: JSON.stringify({
          video_link: videoLink,
          interval_duration: intervalDuration,
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
      })
      .then(res => res.json())
      .then(res => setsegmentedVideos(res && res.interval_videos))
      .catch(err => console.log(err))
  }

  let isBtnDisable = (!segmentSetting || !intervalDuration || !urlValidater(videoLink)) ? true : false;

  return (
    <>
    <div className="wrapper">
      <h4>Segment Video</h4>
      <form>
        <div class="form-group">
          <label for="video_link" className="col-form-label">Video Link</label>
          <input type="text" class="form-control video-link" name="video_link" placeholder="Video Link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
        </div>
        <div class="form-group">
          <label for="segmentSetting" className="col-form-label">Segment Setting</label>
          <select name="segmentSetting" class="form-control segment-settings" value={segmentSetting} onChange={(e) => setsegmentSetting(e.target.value)}>
            {
              settingsOptions.map(item => {
              return  <option value={item.value}>{item.name}</option>
              })
            }
          </select>
        </div>
        {segmentSetting === 'interval_duration' &&
        <div class="form-group">
          <label for="intervalDuration" className="col-form-label">Interval Duration (in secs)</label>
          <input type="number" class="form-control interval-duration" name="intervalDuration" min="1" max="3" placeholder="Interval Duration" value={intervalDuration} onChange={(e) => setintervalDuration(e.target.value)}/>
        </div>
        }
        <div class="form-group col-md-3 mt-2">
          <button type="button" class={`btn btn-primary process-video ${isBtnDisable ? 'disabled' : ''}`} onClick={processInterval}>Segment Video</button>
        </div>
      </form>
    </div>

    {segmentedVideos && segmentedVideos.length > 0 && <Videosegment segmentedVideos={segmentedVideos}/>}
    <hr/>
    <Combinevideo />
    </>
  );
}

export default Dashboard;