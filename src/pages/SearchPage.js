import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/Home.css";
import "../css/HomeBlogContainer.css";
import HomeBlogContainer from "../components/HomeBlogContainer";
import ProfileContainer from "../components/ProfileContainer";
import Footer from "../components/Footer";
import blog_data from "../utils/blog_data.json";
import Header from "../components/Header";
import { getPosts } from "../firebase/firebase_routes";

const SearchPage = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryBool, setCategoryBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(true);

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("t");

  useEffect(() => {
    // setTotalPosts(blog_data);
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
        }
      })
      .catch((err) => {
        console.log("e");
        setLoadingBool(true);
      });
  }, []);

  useEffect(() => {
    let allSearchQuery = searchQuery.toLowerCase().split(" ");

    let postData = [];
    totalPosts &&
      totalPosts.forEach((post) => {
        console.log(searchQuery.toLowerCase().split(" "));
        // if (
        //   post.title
        //     .toLowerCase()
        //     .split(" ")
        //     .includes(searchQuery.toLowerCase())
        // ) {
        //   console.log("true ekek");
        //   postData.push(post);
        // }
        if (
          isSearchArrayInMainArray(
            post.title.toLowerCase().split(" "),
            allSearchQuery
          )
        ) {
          console.log("true ekek");
          postData.push(post);
        }
      });

    setSearchPosts(postData);
  }, [totalPosts, searchQuery]);

  function isSearchArrayInMainArray(mainArray, searchArray) {
    const mainArrayLower = mainArray.map((item) => item.toLowerCase());
    const searchArrayLower = searchArray.map((item) => item.toLowerCase());

    // Check if every element in the search array exists in the main array
    return searchArrayLower.every((item) => mainArrayLower.includes(item));
  }

  return (
    <div className={`home ${display && "dark-mode"}`}>
      <Header
        display={display}
        setDisplay={setDisplay}
        bar={bar}
        setBar={setBar}
        setCurrentPage={setCurrentPage}
      />
      <div className="home-section">
        <HomeBlogContainer
          setTotalPosts={setTotalPosts}
          totalPosts={totalPosts && totalPosts}
          searchPosts={searchPosts}
          searchQuery={searchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          display={display}
          categoryBool={categoryBool}
          loadingBool={loadingBool}
        />
        <ProfileContainer display={display} />
      </div>
      <Footer display={display} />
    </div>
  );
};

export default SearchPage;
