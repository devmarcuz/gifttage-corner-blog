import React, { useEffect, useState } from "react";
import "../css/Home.css";
import "../css/HomeBlogContainer.css";
import HomeBlogContainer from "../components/HomeBlogContainer";
import ProfileContainer from "../components/ProfileContainer";
import Footer from "../components/Footer";
import blog_data from "../utils/blog_data.json";
import Header from "../components/Header";
import { getPosts } from "../firebase/firebase_routes";

const Home = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryBool, setCategoryBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(true);

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
        }
      })
      .catch((err) => {
        console.log("e");
        setLoadingBool(true);
      });
  }, []);

  return (
    <div className={`home ${display && "dark-mode"}`}>
      <Header
        display={display}
        setDisplay={setDisplay}
        bar={bar}
        setBar={setBar}
      />
      <div className="home-section">
        <HomeBlogContainer
          setTotalPosts={setTotalPosts}
          totalPosts={totalPosts && totalPosts}
          searchPosts={searchPosts}
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

export default Home;
