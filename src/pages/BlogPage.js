import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/Home.css";
import "../css/BlogPage.css";
import Footer from "../components/Footer";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Comments from "../components/Comments";
import NotFoundContainer from "../components/NotFoundContainer";
import ImageContainer from "../components/ImageContainer";
import LoadingContainer from "../components/LoadingContainer";
import Header from "../components/Header";
import { getPosts, updatePostViews } from "../firebase/firebase_routes";
import CommentsBlog from "../components/CommentsBlog";
import ConfirmDeleteCommentModal from "../components/admin/ConfirmDeleteCommentModal";

const BlogPage = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [blog, setBlog] = useState({});
  const [dataCond, setDataCond] = useState(false);
  const [recommendPost, setRecommendPost] = useState([]);
  const [imgShow, setImgShow] = useState(false);
  const [pageNotFound, setPageNotFound] = useState();
  const [blogId, setBlogId] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showConforimDeleteComment, setShowConforimDeleteComment] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState([]);

  const param = useParams();

  useEffect(() => {
    const userData = getItemWithExpiration("user");
    if (userData) {
      setAdmin(true);
    }
  }, []);

  function getItemWithExpiration(key) {
    const storedItem = localStorage.getItem(key);
    if (!storedItem) {
      return null; // Item does not exist
    }

    const parsedItem = JSON.parse(storedItem);
    const now = new Date().getTime();

    if (now >= parsedItem.expirationTime) {
      localStorage.removeItem(key); // Remove the expired item
      return null; // Item has expired
    }

    return parsedItem.value; // Return the item's value
  }

  useEffect(() => {
    setPageNotFound("");
    const dataTitle = param.blog.split("-").join(" ");
    getPosts()
      .then((res) => {
        res.filter((data) => {
          if (data.title.toLowerCase() === dataTitle) {
            setBlogId(data.id);
            setPageNotFound("");
          }
        });
      })
      .catch((err) => {
        setPageNotFound(404);
      });
  }, [param]);

  useEffect(() => {
    setPageNotFound("");
    const dataTitle = param.blog.split("-").join(" ");
    setDataCond(false);
    getPosts()
      .then((res) => {
        res.filter((data) => {
          if (data.title.toLowerCase() === dataTitle) {
            setPageNotFound("");
            setBlog(data);
            setDataCond(true);
            let allRecommCategory = [];
            // setRecommendPost(
            [...res]
              .filter((dt) => dt.draft !== true)
              .filter((dt) => {
                dt.category.forEach((ct) => {
                  if (data.category.includes(ct)) {
                    allRecommCategory.push(dt);
                    return dt;
                  }
                });
              });

            setRecommendPost(
              Array.from(new Set(allRecommCategory))
                .filter((dt) => dt !== data)
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
            );
            // );
          } else {
            setPageNotFound(404);
          }
        });
      })
      .catch((err) => {
        setPageNotFound(404);
      });
  }, [param]);

  useEffect(() => {
    if (dataCond) {
      const dataTitle = param.blog.split("-").join(" ");
      let category;
      getPosts().then((res) => {
        res.filter((data) => {
          if (data.title.toLowerCase() === dataTitle) {
            category = data.category[0];
            let letter = category && category.split("");
            let word = letter.shift().toUpperCase();
            letter.unshift(word);
          }
        });
      });
    }
  }, [dataCond]);

  useEffect(() => {
    const dataTitle = param.blog.split("-").join(" ");
    setDataCond(false);
    setPageNotFound("");

    getPosts()
      .then((res) => {
        const postData = res.find(
          (data) => data.title.toLowerCase() === dataTitle
        );
        if (postData) {
          const hasViewed = localStorage.getItem(`viewed_${postData.id}`);
          if (!hasViewed) {
            updatePostViews(postData.id);
            localStorage.setItem(`viewed_${postData.id}`, "true");
          }
        } else {
          setPageNotFound(404);
        }
      })
      .catch((err) => {
        setPageNotFound(404);
      });
  }, [param]);

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

  const toLink = (data) => {
    return data.title.toLowerCase().split(" ").join("-");
  };

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
    <div className={`blog-page-container home ${display && "dark-mode"}`}>
      <Header
        display={display}
        setDisplay={setDisplay}
        bar={bar}
        setBar={setBar}
      />

      {dataCond ? (
        <div className="blog-page-section">
          <div className="post">
            <div className="categorie">
              {blog.category.map((cate, index) => (
                <span key={index}>
                  <Link to={`/blog/${cate.toLowerCase()}`}>{cate}</Link>
                </span>
              ))}
            </div>
            <h1>{dataCond && blog.title}</h1>
            <div className="dates">
              {dataCond && blog.createdAt}{" "}
              <span>{blog.comments >= 1 ? blog.comments : "No"} comments</span>
            </div>
            {/* <div className="img" onClick={() => setImgShow(true)}>
              <img src="/images/pexels-bryan-catota-3756766.jpg" alt="" />
            </div> */}
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: dataCond && blog.content }}
            />
            <div className="share-post">
              <p>Share this:</p>
              <div className="socials">
                <a href="https://www.elsieisy.com/it-is-your-life-be-entitled/?share=facebook&nb=1">
                  <FaFacebookF />
                </a>
                <a>
                  <FaInstagram />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://gifttage-corner.vercel.app/${param.blog}&text=${param.blog}%20via%20%40elsieisyblog`}
                >
                  <FaTwitter />
                </a>
                <a href="https://www.elsieisy.com/it-is-your-life-be-entitled/?share=jetpack-whatsapp&nb=1">
                  <FaWhatsapp />
                </a>
                <a href="https://www.elsieisy.com/it-is-your-life-be-entitled/?share=linkedin&nb=1">
                  <FaLinkedin />
                </a>
                <a href="">
                  <BiLogoGmail />
                </a>
                <a href="https://www.elsieisy.com/it-is-your-life-be-entitled/?share=pinterest&nb=1">
                  <FaPinterest />
                </a>
              </div>
            </div>
            <div className="similar-posts">
              <p>You may also like</p>
              <div className="similar-container">
                {recommendPost.map((data, index) => (
                  <Link
                    to={`/${toLink(data)}`}
                    key={index}
                    className="similar-post"
                    onClick={() => setPageNotFound("")}
                  >
                    <div className="date">{data.createdAt}</div>
                    <img src={`${findFirstImgSrc(data.content)}`} alt="" />
                    <div className="title">{data.title}</div>
                  </Link>
                ))}
              </div>
            </div>
            {/* <Comments display={display} param={param} /> */}
            <CommentsBlog
              blogId={blogId}
              display={display}
              admin={admin}
              setShowConforimDeleteComment={setShowConforimDeleteComment}
              setCommentId={setCommentId}
              setIsModalOpen={setIsModalOpen}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
      ) : !condLoad() && pageNotFound !== 404 ? (
        <LoadingContainer display={display} />
      ) : (
        <NotFoundContainer display={display} />
      )}
      <Footer display={display} />
      {imgShow && (
        <ImageContainer
          setImgShow={setImgShow}
          imgShow={imgShow}
          setShowConforimDeleteComment={setShowConforimDeleteComment}
        />
      )}
      {showConforimDeleteComment && (
        <ConfirmDeleteCommentModal
          message="Are you sure you want to delete this comment? This action is irreversible!!!"
          onCancel={() => setShowConforimDeleteComment(false)}
          id={commentId}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          setComments={setComments}
          comments={comments}
        />
      )}
    </div>
  );
};

export default BlogPage;
