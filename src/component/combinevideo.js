import React, { useState } from 'react';
import { settingsOptions, API_URL, videoDetail } from '../contants';
import { urlValidater } from '../functions';
import CombinedVideoDetail from './combinedvideodetail';
import './index.css';

function Combinevideo() {
  const [ videoList, setVideoList ] = useState([]);
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const [ combinedVideo, setCombinedVideo ] = useState('');

  function combineVideo() {
    return fetch(`${API_URL}combine-video`,
      {
      method: "POST",
      body: JSON.stringify({
          segments: videoList,
          width,
          height
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
      })
      .then(res => res.json())
      .then(res => setCombinedVideo(res && res.video_url))
      .catch(err => console.log(err))
  }

  const addVideo = () => {
    let initialState = Object.assign({}, videoDetail)
    let newList = [...videoList, initialState];
    setVideoList(newList);
  }

  const setVideoDetail = (event, index) => {
    const { name, value} = event.target;
    let newVideoList = [...videoList];
    newVideoList[index][name] = value;
    setVideoList(newVideoList);
  }

  const deleteRow = (index) => {
    let newVideoList = [...videoList];
    let filteredList = newVideoList.filter((item, rowIndex) => rowIndex !== index);
    setVideoList(filteredList);
  }

  const validate = () => {
    videoList.forEach(item => {
      if (!urlValidater(item.video_url)) {
        return false
      } else if (item.start > item.end) {
        return false;
      }
    })

    if (height < 1 || width < 1) {
        return false;
    }
    return true;
  }

let isBtnDisable = !validate();console.log('isBtnDisable', isBtnDisable);
  return (
    <>
    <div className="wrapper">
      <h4>Combine Video</h4>
      <form>
        <div class="form-group col-md-3 mt-2 mb-3">
          <button type="button" class={`btn btn-primary`} onClick={addVideo}>Add Video</button>
        </div>
        {(videoList || []).map(({video_url, start, end}, index) => {
         return (
        <>
        <div className="row mb-3" key={`video-list-${index}`}>
            <div class="form-group col-md-6">
              <label for="video_link" className="col-form-label">Video Link</label>
              <input type="text" class="form-control video-link" name="video_url" placeholder="Video Link" value={video_url} onChange={(e) => setVideoDetail(e, index)}/>
            </div>
            <div class="form-group col-md-2">
              <label for="video_link" className="col-form-label">Start at</label>
              <input type="text" class="form-control video-link" name="start" placeholder="Start at" value={start} onChange={(e) => setVideoDetail(e, index)}/>
            </div>
            <div class="form-group col-md-2">
              <label for="video_link" className="col-form-label">End at</label>
              <input type="text" class="form-control video-link" name="end" placeholder="End at" value={end} onChange={(e) => setVideoDetail(e, index)}/>
            </div>
            <div class="form-group col-md-2">
              <button type="button" class={`btn btn-primary`} onClick={() => deleteRow(index)}>Delete</button>
            </div>
          </div>
          </>
        )})
        }
        <div className="row">
            <div class="form-group col-md-2">
              <label for="video_link" className="col-form-label">Video Height</label>
              <input type="number" class="form-control" name="height" placeholder="Video Height" value={height} onChange={(e) => setHeight(e.target.value)}/>
            </div>
            <div class="form-group col-md-2">
              <label for="video_link" className="col-form-label">Video Width</label>
              <input type="number" class="form-control" name="width" placeholder="Video Width" value={width} onChange={(e) => setWidth(e.target.value)}/>
            </div>
          </div>
        <div className="row">
            <div class="form-group col-md-4 mt-4">
              <button type="button" class={`btn btn-primary combine-video ${isBtnDisable ? 'disabled' : ''}`} onClick={combineVideo}>Combine Video(s)</button>
            </div>
          </div>
      </form>
    </div>

    {combinedVideo && 
      <CombinedVideoDetail combinedVideo={combinedVideo} height={height} width={width}/>  
    }
    </>
  );
}

export default Combinevideo;