import React, { useEffect, useState } from "react";
import "../../css/admin/RightSectionDashboard.css";
import { Link, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { FaChevronDown, FaEye, FaPlus } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { BsFileEarmarkFontFill, BsFilter } from "react-icons/bs";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { PiNewspaperFill } from "react-icons/pi";
import PostsTable from "./PostsTable";
import DraftedPostsTable from "./DraftedPostsTable";
import {
  getAllComments,
  getAllNotification,
  getComments,
  getNewsletters,
  getPosts,
} from "../../firebase/firebase_routes";
import Pagination from "./Pagination";
import ConfrimDeleteModal from "./ConfrimDeleteModal";
import COnfirmDraftPostModal from "./ConfirmDraftPostModal";
import LoadingContainer from "../LoadingContainer";

const RightSectionDashboard = ({
  setBarMenu,
  barMenu,
  setBarMenuResponsive,
  barMenuResponsive,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [draftUrl, setDraftUrl] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [totalDraftPost, setTotalDraftPost] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(postsPerPage);
  const [searchArray, setSearchArray] = useState([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showDraftConfirm, setshowDraftConfirm] = useState(false);
  const [postId, setPostId] = useState("");
  const [isModalOpen, setModalIsOpen] = useState(true);
  const [draftedPostLength, setDraftedPostLength] = useState();
  const [allDraftPosts, setAllDraftPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActivate, setFilterActivate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const [recentBool, setRecentBool] = useState(false);
  const [commentsBool, setCommentsBool] = useState(false);
  const [viewsBool, setViewsBool] = useState(false);
  const [titleBool, setTitleBool] = useState(false);
  const [comments, setComments] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/gifttage/blog/admin/drafted-blogs") {
      setDraftUrl(true);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getPosts().then((res) => {
      setTotalPosts([...res].filter((dt) => dt.title));
      setTotalDraftPost(
        [...res].filter((dt) => dt.title).filter((post) => post.draft !== true)
      );
      setDraftedPostLength(
        [...res].filter((dt) => dt.title).filter((post) => post.draft === true)
          .length
      );
      setAllDraftPosts([...res].filter((post) => post.draft === true));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!draftUrl) {
      setCurrentPosts([
        ...(totalDraftPost &&
          totalDraftPost.slice(indexOfFirstPost, indexOfLastPost)),
      ]);
      if (filterActivate) {
        return;
      }
    }
  }, [
    totalDraftPost,
    indexOfLastPost,
    indexOfFirstPost,
    filterActivate,
    draftUrl,
  ]);

  useEffect(() => {
    let allSearchQuery = searchInput.toLowerCase().split(" ");

    if (!draftUrl) {
      let postData = [];
      totalDraftPost &&
        totalDraftPost.forEach((post) => {
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
            postData.push(post);
          }
        });

      setSearchPosts(postData);
    } else {
      let postData = [];
      allDraftPosts &&
        allDraftPosts.forEach((post) => {
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
            postData.push(post);
          }
        });

      setSearchPosts(postData);
    }
  }, [totalDraftPost, searchInput, draftUrl, allDraftPosts]);

  useEffect(() => {
    getAllComments().then((res) => {
      setComments([...res].filter((dt) => dt.commentText));
    });
    getNewsletters().then((res) => {
      setNewsletters([...res].filter((dt) => dt.email));
    });
  }, []);

  useEffect(() => {
    getAllNotification().then((res) => {
      setNotifications(
        [...res]
          .filter((dt) => dt.commentText)
          .sort((obj1, obj2) => {
            const date1 = timestampToDate(obj1.createdAt);
            const date2 = timestampToDate(obj2.createdAt);

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
  }, []);

  function timestampToDate(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function isSearchArrayInMainArray(mainArray, searchArray) {
    const mainArrayLower = mainArray.map((item) => item.toLowerCase());
    const searchArrayLower = searchArray.map((item) => item.toLowerCase());

    // Check if every element in the search array exists in the main array
    return searchArrayLower.every((item) => mainArrayLower.includes(item));
  }

  const handleFilter = (filter) => {
    setFilterActivate(!filterActivate);
    setShowFilter(false);
    switch (filter) {
      case "recents":
        setRecentBool(true);
        setCommentsBool(false);
        setViewsBool(false);
        setTitleBool(false);
        setTotalDraftPost(
          totalDraftPost.sort((obj1, obj2) => {
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
        setAllDraftPosts(
          allDraftPosts.sort((obj1, obj2) => {
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

        break;
      case "views":
        setRecentBool(false);
        setCommentsBool(false);
        setViewsBool(true);
        setTitleBool(false);
        setTotalDraftPost(totalDraftPost.sort((a, b) => b.views - a.views));
        setAllDraftPosts(allDraftPosts.sort((a, b) => b.views - a.views));
        break;
      case "comments":
        setRecentBool(false);
        setCommentsBool(true);
        setViewsBool(false);
        setTitleBool(false);
        setTotalDraftPost(
          totalDraftPost.sort((a, b) => b.comments - a.comments)
        );
        setAllDraftPosts(allDraftPosts.sort((a, b) => b.comments - a.comments));
        break;
      case "title":
        setRecentBool(false);
        setCommentsBool(false);
        setViewsBool(false);
        setTitleBool(true);
        setTotalDraftPost(
          totalDraftPost.sort((obj1, obj2) => {
            return obj1.title.localeCompare(obj2.title);
          })
        );
        setAllDraftPosts(
          allDraftPosts.sort((obj1, obj2) => {
            return obj1.title.localeCompare(obj2.title);
          })
        );
        break;

      default:
        setRecentBool(false);
        setCommentsBool(false);
        setViewsBool(false);
        setTitleBool(false);
        break;
    }
  };

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const options = [
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
  ];

  const handleSelectOption = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    setPostsPerPage(value);
  };

  return (
    <div className={`right-section-dashboard ${barMenu && "display-right"}`}>
      <Header
        setBarMenu={setBarMenu}
        barMenu={barMenu}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setNotifications={setNotifications}
        notifications={notifications}
        setBarMenuResponsive={setBarMenuResponsive}
      />
      <div className="right-section">
        <div className="tiles">
          <div className="tile">
            <div className="content">
              <div className="no">
                {totalPosts
                  ? totalPosts
                      .reduce((total, obj) => total + (obj.views || 0), 0)
                      .toLocaleString()
                  : 0}
              </div>
              <div className="text">Views</div>
            </div>
            <div className="icon">
              <FaEye />
            </div>
          </div>
          <div className="tile">
            <div className="content">
              <div className="no">
                {totalPosts ? totalPosts.length.toLocaleString() : 0}
              </div>
              <div className="text">Posts</div>
            </div>
            <div className="icon">
              <BsFileEarmarkFontFill />
            </div>
          </div>
          <div className="tile">
            <div className="content">
              <div className="no">
                {totalPosts
                  ? totalPosts
                      .filter((post) => post.draft === true)
                      .length.toLocaleString()
                  : 0}
              </div>
              <div className="text">Drafted</div>
            </div>
            <div className="icon">
              <AiFillFile />
            </div>
          </div>
          <div className="tile">
            <div className="content">
              <div className="no">
                {comments ? comments.length.toLocaleString() : 0}
              </div>
              <div className="text">Comments</div>
            </div>
            <div className="icon">
              <BiSolidMessageSquareDots />
            </div>
          </div>
          <div className="tile">
            <div className="content">
              <div className="no">
                {newsletters ? newsletters.length.toLocaleString() : 0}
              </div>
              <div className="text">Suscribers</div>
            </div>
            <div className="icon">
              <PiNewspaperFill />
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingContainer />
        ) : (
          <div className="post-container">
            <div className="post-header">
              <h1>{draftUrl ? "Drafted Posts" : "Posts"}</h1>
              <div className="btns">
                {!draftUrl && (
                  <Link
                    to="/gifttage/blog/admin/create-blog"
                    onClick={() => setCurrentPage(1)}
                  >
                    <span>
                      <FaPlus />
                    </span>
                    Create Post
                  </Link>
                )}
                <div className="btn-contain">
                  <div
                    className="btn"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <BsFilter />
                    <p>Filter</p>
                  </div>
                  <div
                    className={`filters ${showFilter && "display"} ${
                      barMenu && "display-left"
                    }`}
                  >
                    <div
                      className={`filter ${recentBool && "active"}`}
                      onClick={() => handleFilter("recents")}
                    >
                      By Recents
                    </div>
                    <div
                      className={`filter ${commentsBool && "active"}`}
                      onClick={() => handleFilter("comments")}
                    >
                      By Most Comments
                    </div>
                    <div
                      className={`filter ${viewsBool && "active"}`}
                      onClick={() => handleFilter("views")}
                    >
                      By Most Viewed
                    </div>
                    <div
                      className={`filter ${titleBool && "active"}`}
                      onClick={() => handleFilter("title")}
                    >
                      By Post Title
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {draftUrl ? (
              <DraftedPostsTable
                currentPosts={currentPosts}
                currentPage={currentPage}
                totalPosts={allDraftPosts}
                setTotalPosts={setAllDraftPosts}
                searchArray={searchPosts}
                setSearchArray={setSearchPosts}
                setAllPosts={setTotalPosts}
                allPosts={totalPosts}
                setshowDeleteConfirm={setshowDeleteConfirm}
                setshowDraftConfirm={setshowDraftConfirm}
                setPostId={setPostId}
                setModalIsOpen={setModalIsOpen}
                setCurrentPosts={setCurrentPosts}
                indexOfFirstPost={indexOfFirstPost}
                indexOfLastPost={indexOfLastPost}
                filterActivate={filterActivate}
                draftUrl={draftUrl}
              />
            ) : (
              <PostsTable
                currentPosts={currentPosts}
                currentPage={currentPage}
                totalPosts={totalDraftPost}
                setTotalPosts={setTotalDraftPost}
                searchArray={searchPosts}
                setSearchArray={setSearchPosts}
                setAllPosts={setTotalPosts}
                allPosts={totalPosts}
                setshowDeleteConfirm={setshowDeleteConfirm}
                setshowDraftConfirm={setshowDraftConfirm}
                setPostId={setPostId}
                setModalIsOpen={setModalIsOpen}
                comments={comments}
              />
            )}
            <div className="users-pagination">
              <div className="left-pag">
                <p>Showing</p>
                <div className={`custom-select ${isOpen ? "open" : ""}`}>
                  <div
                    className={`custom-select__selected ${
                      selectedOption !== "Select" ? "selected" : ""
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {selectedOption}
                    <FaChevronDown />
                  </div>
                  <ul className="custom-select__options">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className="custom-select__option"
                        onClick={() => handleSelectOption(option.value)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
                {!draftUrl ? (
                  searchArray.length < 1 ? (
                    <p>out of {totalDraftPost && totalDraftPost.length}</p>
                  ) : (
                    <p>out of {searchArray && searchArray.length}</p>
                  )
                ) : searchArray.length < 1 ? (
                  <p>out of {totalDraftPost && draftedPostLength}</p>
                ) : (
                  <p>out of {searchArray && searchArray.length}</p>
                )}
              </div>
              {draftUrl
                ? currentPosts.length >= 1 && (
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={allDraftPosts && allDraftPosts.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  )
                : currentPosts.length >= 1 && (
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={totalDraftPost && totalDraftPost.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  )}
            </div>
          </div>
        )}
      </div>
      {showDeleteConfirm && (
        <ConfrimDeleteModal
          message="Are you sure you want to delete this article? This action is irreversible!!!"
          onCancel={() => setshowDeleteConfirm(false)}
          setAllPosts={setTotalPosts}
          allPosts={totalPosts}
          totalPosts={totalDraftPost}
          setTotalPosts={setTotalDraftPost}
          id={postId}
          isOpen={isModalOpen}
          setIsOpen={setModalIsOpen}
        />
      )}
      {showDraftConfirm && (
        <COnfirmDraftPostModal
          message={
            draftUrl
              ? "Are you sure you want to undraft this article?"
              : "Are you sure you want to draft this article?"
          }
          onCancel={() => setshowDeleteConfirm(false)}
          setAllPosts={setTotalPosts}
          allPosts={totalPosts}
          totalPosts={totalDraftPost}
          setTotalPosts={setTotalDraftPost}
          id={postId}
          isOpen={isModalOpen}
          setIsOpen={setModalIsOpen}
          draftUrl={draftUrl}
          setCurrentPosts={setCurrentPosts}
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          mainDraftPost={allDraftPosts}
        />
      )}
    </div>
  );
};

export default RightSectionDashboard;
