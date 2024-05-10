import React, { useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { searchVideo } from "../reduxreducer/reduxreducer";
const Navbar = () => {

  const dispatch = useDispatch();

  const searchRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
 
  useEffect(() => {
    if (token === null) {
      navigate("/loginpage");
    }
  
  }, [navigate, token]);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = searchRef.current.value.trim();
   if(searchQuery.length>0){
    const searchQuery = searchRef.current.value.trim();
    const apiKey = "AIzaSyCIfHsLh1_aQLeZMZkZTcgX4NqyPeHePv8";

    const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=21&q=${searchQuery}&type=video&videoDuration=long&key=${apiKey}`;

    axios
      .get(requestUrl)
      .then((response) => {
        localStorage.setItem("searchQuery", true);
        dispatch(searchVideo.SearchVideosFunction(response.data.items)); 
        console.log("Searched videos:", response.data.items);
        searchRef.current.value='';
      })
      .catch((error) => {
        console.error("Error fetching searched videos:", error);
      });
   }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          SachinTube
        </Link>

        <div className="ml-auto d-flex">
          {token ? (
            <>
              <div className="input-group mr-3">
                <input
                  type="text"
                  ref={searchRef}
                  className="form-control custom-search-input" 
                  placeholder="Search videos"
                />
                <div className="input-group-append">
                  <button onClick={handleSearch} className="btn btn-success" type="button">
                    Search
                  </button>
                </div>
              </div>
              <Link
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("searchQuery");
                  localStorage.removeItem("videoDetail");
                  navigate("/loginpage");
                }}
                className="btn btn-danger ml-3"
                to="/loginpage"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link className="btn btn-primary" to="/loginpage">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
