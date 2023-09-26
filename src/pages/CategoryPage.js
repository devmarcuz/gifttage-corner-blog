import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Home.css";
import "../css/HomeBlogContainer.css";
import HomeBlogContainer from "../components/HomeBlogContainer";
import ProfileContainer from "../components/ProfileContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPosts } from "../firebase/firebase_routes";

const CategoryPage = ({ display, setDisplay }) => {
  const param = useParams();

  const [bar, setBar] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryBool, setCategoryBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(true);

  const category = param.category;

  useEffect(() => {
    let letter = category.split("");
    let word = letter.shift().toUpperCase();
    letter.unshift(word);

    getPosts().then((res) => {
      setTotalPosts(
        [...res]
          .filter((data) =>
            data.category.includes(letter.join("").toLowerCase())
          )
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
    });

    getPosts()
      .then((res) => {
        if (res.length === 0) {
          setLoadingBool(true);
        } else {
          setLoadingBool(false);
          let condArr = [];
          [...res].filter((data) => {
            if (data.category.includes(letter.join("").toLowerCase())) {
              condArr.push(true);
            } else {
              condArr.push(false);
            }
          });
          if (condArr.includes(true)) {
            setCategoryBool(true);
          } else {
            setCategoryBool(false);
          }
        }
      })
      .catch((err) => {
        // console.log("e");
      });
  }, [category]);

  // useEffect(() => {
  //   let letter = category.split("");
  //   let word = letter.shift().toUpperCase();
  //   letter.unshift(word);

  //   getPosts()
  //     .then((res) => {
  //       if (res.length === 0) {
  //         setLoadingBool(true);
  //       } else {
  //         setLoadingBool(false);
  //         [...res].filter((data) => {
  //           if (data.category.includes(letter.join("").toLowerCase())) {
  //             setLoadingBool(false);
  //             setCategoryBool(true);
  //           } else {
  //             // setCategoryBool(false);
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setLoadingBool(true);
  //     });
  // }, [category]);

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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          category={category}
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

export default CategoryPage;
