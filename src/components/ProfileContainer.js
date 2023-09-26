import React, { useEffect, useState } from "react";
import "../css/ProfileContainer.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSearch,
} from "react-icons/fa";
import { getPosts } from "../firebase/firebase_routes";
import Newsletter from "./Newsletter";

const ProfileContainer = ({ display }) => {
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getPosts()
      .then((res) => {
        setTotalPosts(
          [...res]
            .filter((dt) => dt.draft !== true)
            .sort((obj1, obj2) => {
              const date1 = new Date(obj1.createdAt);
              const date2 = new Date(obj2.createdAt);

              // Compare the dates in reverse order
              if (date1 < date2) {
                return 1; // obj1 comes after obj2
              } else if (date1 > date2) {
                return -1; // obj1 comes before obj2
              } else {
                return 0; // dates are equal
              }
            })
        );
      })
      .catch((err) => {});
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
      navigate(`/search?t=${searchInput}`);
    }
  };

  const toLink = (data) => {
    return data.title.toLowerCase().split(" ").join("-");
  };

  return (
    <div className={`profile-container ${display && "dark-mode"}`}>
      <div className="search-container">
        <form action="" className="search">
          <input
            type="search"
            name="search"
            value={searchInput}
            placeholder="SEARCH"
            onChange={handleChange}
          />
          <button onClick={onSearch}>
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="profile">
        <img src="/images/pexels-mikotoraw-photographer-3639496.jpg" alt="" />
        <p>
          Gift Korie is a versatile Media Personality, Marketing, Brand and
          Communications Executive, Social Media Consultant/Junkie, your
          influencer Marketing strategist through mindmastik.com, Travel and
          fitness Lover and a witty extra ordinary sweet girl
        </p>
        <h1>Gift Korie</h1>
      </div>
      <Newsletter />
      <div className="post-container">
        <div className="content">
          <div className="title">Latest Posts</div>
          {totalPosts &&
            totalPosts.slice(0, 7).map((data, index) => (
              <div key={index} className="posts">
                <Link to={`/${toLink(data)}`}>{data.title.toUpperCase()}</Link>
              </div>
            ))}
        </div>
      </div>

      <div className="post-container">
        <div className="content">
          <div className="title">Socials</div>
          <div className="socials">
            <Link>
              <FaFacebookF />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <FaTwitter />
            </Link>
            <Link>
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
