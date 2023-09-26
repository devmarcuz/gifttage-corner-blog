import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Home.css";
import "../css/HomeBlogContainer.css";
import HomeBlogContainer from "../components/HomeBlogContainer";
import ProfileContainer from "../components/ProfileContainer";
import Footer from "../components/Footer";
import blog_data from "../utils/blog_data.json";
import NotFoundContainer from "../components/NotFoundContainer";
import Header from "../components/Header";
import { getPosts } from "../firebase/firebase_routes";
import LoadingContainer from "../components/LoadingContainer";

const PageNumber = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);
  const [loadingBool, setLoadingBool] = useState(true);
  const [categoryBool, setCategoryBool] = useState(false);
  const [pageNotFound, setPageNotFound] = useState();

  const pageNum = useParams().pageNumber;

  useEffect(() => {
    getPosts()
      .then((res) => {
        if (res.length === 0) {
          setLoadingBool(true);
        } else {
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
          setCategoryBool(true);
          setLoadingBool(false);
          if (pageNum) {
            setCurrentPage(Number(pageNum));
          } else {
            setPageNotFound(404);
          }
        }
      })
      .catch((err) => {
        setLoadingBool(true);
      });
  }, [pageNum]);

  useEffect(() => {
    setCurrentPosts([
      ...(totalPosts && totalPosts.slice(indexOfFirstPost, indexOfLastPost)),
    ]);
  }, [totalPosts, indexOfLastPost, indexOfFirstPost]);

  const condLoad = () => {
    let bool = false;
    getPosts()
      .then((res) => {
        bool = true;
        return bool;
      })
      .catch((err) => {
        bool = false;
        return bool;
      });
  };

  useEffect(() => {
    getPosts()
      .then((res) => {
        if (currentPosts.length < 1) {
          setPageNotFound(404);
        }
      })
      .catch((err) => {});
  }, [currentPosts]);

  return (
    <div className={`home ${display && "dark-mode"}`}>
      <Header
        display={display}
        setDisplay={setDisplay}
        bar={bar}
        setBar={setBar}
        setCurrentPage={setCurrentPage}
      />
      {currentPosts.length >= 1 ? (
        <div className="home-section">
          <HomeBlogContainer
            setTotalPosts={setTotalPosts}
            totalPosts={totalPosts && totalPosts}
            searchPosts={searchPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentPosts={currentPosts}
            setCurrentPosts={setCurrentPosts}
            display={display}
            categoryBool={categoryBool}
            loadingBool={loadingBool}
          />
          <ProfileContainer display={display} />
        </div>
      ) : !condLoad() && pageNotFound !== 404 ? (
        <LoadingContainer display={display} />
      ) : (
        <NotFoundContainer display={display} />
      )}
      <Footer display={display} />
    </div>
  );
};

export default PageNumber;
