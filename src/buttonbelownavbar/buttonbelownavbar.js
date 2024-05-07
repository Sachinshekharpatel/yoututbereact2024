import React from "react";
import "./button.css";
import { useDispatch } from "react-redux";
import { searchVideo } from "../reduxreducer/reduxreducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ButtonBelowNavbar() {
   const navigate = useNavigate();
    const dispatch = useDispatch();
  const HandleShorts = () => {
    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=24&type=video&key=${apiKey}`;

    axios
      .get(requestUrl)
      .then((response) => {
        dispatch(searchVideo.SearchVideosFunction(response.data.items));
        // console.log(response.data);
        navigate('/')
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const Handletech = () => {
    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=21&regionCode=IN&type=video&videoCategoryId=28&key=${apiKey}`;

    axios
      .get(requestUrl)
      .then((response) => {
        dispatch(searchVideo.SearchVideosFunction(response.data.items));
        navigate('/')
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const HandleMusic = () => {
    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&type=video&videoCategoryId=10&key=${apiKey}`;
    axios
      .get(requestUrl)
      .then((response) => {
        dispatch(searchVideo.SearchVideosFunction(response.data.items));
        navigate('/')
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const HandleTrending = () => {
    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&type=video&key=${apiKey}`;
    axios
      .get(requestUrl)
      .then((response) => {
        dispatch(searchVideo.SearchVideosFunction(response.data.items));
        navigate('/')
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const HandleMix = () => {
    const categories = ["music", "sports", "news", "entertainment"]; // List of categories to include in the mix

    const apiKey = "AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk";
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=21&regionCode=IN&type=video&videoCategoryId=${[
      Math.floor(Math.random() * categories.length),
    ]}&key=${apiKey}`;

    axios
      .get(requestUrl)
      .then((response) => {
        dispatch(searchVideo.SearchVideosFunction(response.data.items));
        navigate('/')
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button
              onClick={() => {
                HandleShorts();
              }}
              className="nav-link"
            >
              Shorts
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                Handletech();
              }}
              className="nav-link"
            >
              Technology
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                HandleTrending();
              }}
              className="nav-link"
            >
              Trending
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                HandleMusic();
              }}
              className="nav-link"
            >
              Music
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                HandleMix();
              }}
              className="nav-link"
            >
              Mix
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ButtonBelowNavbar;
