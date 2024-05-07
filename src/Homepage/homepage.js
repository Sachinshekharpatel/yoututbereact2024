import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { searchVideo } from "../reduxreducer/reduxreducer";
import { useSelector } from "react-redux";
const HomePage = () => {
  const searchArrayData = useSelector((state) => state.video.searchVideos);
  const navigate = useNavigate();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (token === null) {
      navigate("/loginpage");
    } else {
      navigate("/");
    }

    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";

    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=21&key=${apiKey}`;

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
  }, [navigate, token]);

  useEffect(() => {
    console.log(searchArrayData);
    setRecommendedVideos(searchArrayData);
  }, [searchArrayData]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Your Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Recommended
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Trending
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Music
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Mix
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Web Development
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recommendedVideos.map((video) => (
            <div key={Math.random()} className="col">
              <div className="video-card rounded p-3 border h-100">
                <img
                  src={video.snippet.thumbnails.high.url} // Use high quality thumbnail
                  className="video-thumbnail img-fluid rounded"
                  alt={video.snippet.title}
                />
                <div className="video-details mt-3">
                  <div className="channel-logo">
                    {video.snippet.channelLogoUrl && (
                      <img
                        src={video.snippet.channelLogoUrl}
                        alt={video.snippet.channelTitle}
                        className="channel-logo-img rounded-circle"
                      />
                    )}
                  </div>
                  <div className="video-info ml-3">
                    <h5 className="video-title">{video.snippet.title}</h5>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
