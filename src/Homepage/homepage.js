import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./homepage.css";
import ButtonBelowNavbar from "../buttonbelownavbar/buttonbelownavbar";

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
      <ButtonBelowNavbar></ButtonBelowNavbar>
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recommendedVideos.map((video) => (
            <div key={Math.random()} className="col">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                <div className="video-card rounded p-3 border h-100">
                  <img
                    src={video.snippet.thumbnails.high.url}
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
                    <div className="video-info ml-1">
                      <h5 className="video-title">{video.snippet.title}</h5>

                      <button
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Watch Video
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
