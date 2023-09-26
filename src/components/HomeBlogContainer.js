import React, { useEffect, useState } from "react";
import "../css/HomeBlogContainer.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";
import Pagination from "./Pagination";
import LoadingContainer from "./LoadingContainer";

const HomeBlogContainer = ({
  totalPosts,
  searchPosts,
  searchQuery,
  currentPage,
  setCurrentPage,
  category,
  display,
  categoryBool,
  loadingBool,
}) => {
  const [postsPerPage, setPostsPerPage] = useState(7);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [searchInput, setSearchInput] = useState("");
  const [currentPosts, setCurrentPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(totalPosts);
    if (searchQuery) {
      setCurrentPosts([
        ...(searchPosts &&
          searchPosts.slice(indexOfFirstPost, indexOfLastPost)),
      ]);
    } else {
      setCurrentPosts([
        ...(totalPosts && totalPosts.slice(indexOfFirstPost, indexOfLastPost)),
      ]);
    }
  }, [totalPosts, indexOfLastPost, indexOfFirstPost, searchPosts, searchQuery]);

  const paginate = (number) => {
    setCurrentPage(number);
  };

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

  function truncateTextToWords(text, maxWords) {
    const words = text.split(" ");

    if (words.length <= maxWords) {
      return text; // Return the original text if it has fewer or equal words than the specified limit.
    } else {
      const truncatedText = words.slice(0, maxWords).join(" ");
      return `${truncatedText}...`;
    }
  }

  function findFirstImgSrc(htmlText) {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = htmlText.match(imgRegex);

    if (match && match.length > 1) {
      console.log(match[1]);
      return match[1]; // Return the URL of the first img tag
    } else {
      return null; // Return null if no img tag found in the HTML text
    }
  }

  return (
    <div className={`home-blog-container ${display && "dark-mode"}`}>
      {searchQuery && !loadingBool && (
        <div className="search-results">
          <h1>Search Results</h1>
          {searchPosts.length >= 1 ? (
            searchPosts.length > 1 ? (
              <p>{searchPosts.length} results found.</p>
            ) : (
              <p>{searchPosts.length} result found.</p>
            )
          ) : (
            <p>No results found. Please broaden your terms and search again.</p>
          )}
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
        </div>
      )}
      {loadingBool ? (
        <LoadingContainer display={display} />
      ) : (
        !categoryBool && (
          <div className="search-results">
            <h1>No Results Found</h1>
            <p>
              Either that link doesn't exist anymore or something went haywire
              on our end. Let's get you to the right place, ok? Try searching
              for what you were looking for using the search button or head back
              to the homepage.
            </p>

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
          </div>
        )
      )}
      <div className="posts">
        {categoryBool &&
          currentPosts.map((pst, index) => (
            <div className="post" key={index}>
              <div className="categorie">
                {pst.category.map((cate, index) => (
                  <span key={index}>
                    <Link to={`/blog/${cate.toLowerCase()}`}>{cate}</Link>
                  </span>
                ))}
              </div>
              <h1>{pst.title}</h1>
              <div className="dates">
                {pst.createdAt}{" "}
                <span>{pst.comments >= 1 ? pst.comments : "No"} comments</span>
              </div>
              <div className="img">
                <Link to={`/${toLink(pst)}`}>
                  <img src={`${findFirstImgSrc(pst.content)}`} alt="" />
                </Link>
              </div>
              <div className="content">
                {truncateTextToWords(pst.value, 49)}{" "}
                <Link to={`/${toLink(pst)}`}>Read More</Link>
              </div>
              <div className="footer">
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
                </div>
                <div className="end">
                  <div className="border"></div>
                  <Link to={`/${toLink(pst)}`}>CONTINUE READING</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      {searchQuery
        ? totalPosts &&
          searchPosts.length >= 1 && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={
                searchPosts.length < 1 ? totalPosts.length : searchPosts.length
              }
              paginate={paginate}
              currentPage={currentPage}
              display={display}
            />
          )
        : categoryBool &&
          totalPosts && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={
                searchPosts.length < 1 ? totalPosts.length : searchPosts.length
              }
              paginate={paginate}
              currentPage={currentPage}
              category={category}
              display={display}
            />
          )}
    </div>
  );
};

export default HomeBlogContainer;
