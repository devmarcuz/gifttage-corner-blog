import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "../css/NotFoundContainer.css";

const NotFoundContainer = ({ display }) => {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const toLink = (data) => {
    return data.title.toLowerCase().split(" ").join("-");
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
      navigate(`/search?t=${searchInput}`);
    }
  };

  return (
    <div className={`not-found ${display && "dark-mode"}`}>
      <div className="not-found-section">
        <h1>404</h1>
        <h2>Sorry! This page can't be loaded!</h2>
        <p>
          Either that link doesn't exist anymore or something went haywire on
          our end. Let's get you to the right place, ok? Try searching for what
          you were looking for using the search button or head back to the
          homepage below.
        </p>
        <div className="actions">
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
          <Link to="/">Back to homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundContainer;
