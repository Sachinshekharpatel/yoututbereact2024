import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import ButtonBelowNavbar from "../buttonbelownavbar/buttonbelownavbar";
import { useNavigate } from "react-router-dom";
import { searchVideo } from "../reduxreducer/reduxreducer";
import axios from "axios";
import "./watchpage.css";
function WatchVideo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getsearchVideo = useSelector((state) => state.video.searchVideos);
  const videoDetail = JSON.parse(localStorage.getItem("videoDetail")) || null;
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [videoIdToPlay, setVideoIdToPlay] = useState(null);
  const token = localStorage.getItem("token") || null;
  const channelLogo =
    videoDetail.snippet.channelLogoUrl ||
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91dHViZSUyMGxvZ298ZW58MHx8MHx8fDA%3D";

  useEffect(() => {
    console.log(getsearchVideo);
    setRecommendedVideos(getsearchVideo);
    if (videoDetail.id.videoId) {
      setVideoIdToPlay(videoDetail.id.videoId);
      console.log(videoIdToPlay);
    } else {
      setVideoIdToPlay(videoDetail.id);
      console.log(videoIdToPlay);
    }
  }, [getsearchVideo]);

  useEffect(() => {
    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";

    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&videoCategoryId=24&chart=mostPopular&maxResults=21&key=${apiKey}`;

    axios
      .get(requestUrl)
      .then((response) => {
        setRecommendedVideos(response.data.items);

        console.log("Recommended videos:", response.data.items);

        response.data.items.forEach((video, index) => {
          const channelId = video.snippet.channelId;
          const channelRequestUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;

          axios
            .get(channelRequestUrl)
            .then((channelResponse) => {
              const channelLogoUrl =
                channelResponse.data.items[0].snippet.thumbnails.default.url;
              // Update recommendedVideos state with channel logo URL
              setRecommendedVideos((prevRecommendedVideos) => {
                const updatedVideos = [...prevRecommendedVideos];
                updatedVideos[index].snippet.channelLogoUrl = channelLogoUrl;
                return updatedVideos;
              });
            })
            .catch((error) => {
              console.error(
                "Error fetching channel details for video:",
                video.snippet.title,
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching recommended videos:", error);
      });
  }, [token]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const watchVideoBtnHandler = (videoDetail) => {
    navigate(`/watchVideoPage`);
    console.log(videoDetail);
    localStorage.setItem("videoDetail", JSON.stringify(videoDetail));
    dispatch(searchVideo.SearchVideosFunction(videoDetail));
  };

  return (
    <div>
      <ButtonBelowNavbar></ButtonBelowNavbar>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <YouTube videoId={videoIdToPlay} opts={opts} />
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <div className="d-flex align-items-center ">
              <img
                src={channelLogo}
                alt="Channel Logo"
                className="rounded-circle channel-logo mr-3"
              />
              <div>
                <h5 className="mb-0 channel-title">
                  {videoDetail.snippet.channelTitle}
                </h5>
                <small className="text-muted published-date">
                  Published on{" "}
                  {new Date(
                    videoDetail.snippet.publishedAt
                  ).toLocaleDateString()}
                </small>
              </div>
            </div>
            <div>
              <h4 className="video-title">{videoDetail.snippet.title}</h4>
              <small className="text-muted published-date">
                Description {videoDetail.snippet.description}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recommendedVideos.map((video) => (
            <div key={Math.random()} className="col">
              <div className="video-card rounded border h-100">
                <img
                  src={video.snippet.thumbnails.high.url}
                  className="video-thumbnail img-fluid rounded"
                  alt={video.snippet.title}
                />
                <div className="video-details p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="channel-logo">
                      {video.snippet.channelLogoUrl && (
                        <img
                          src={video.snippet.channelLogoUrl}
                          alt={video.snippet.channelTitle}
                          className="channel-logo-img rounded-circle"
                        />
                      )}
                    </div>
                    <h5 className="video-title mb-0 ml-2">
                      {video.snippet.title}
                    </h5>
                  </div>
                </div>
                <button
                  className="btn btn-success btn-sm "
                  onClick={() => watchVideoBtnHandler(video)}
                >
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
