import React, { useEffect } from "react";
import { BsFileEarmarkZipFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getComments } from "../../firebase/firebase_routes";

const PostsTable = ({
  currentPosts,
  currentPage,
  totalPosts,
  setTotalPosts,
  setSearchArray,
  searchArray,
  setAllPosts,
  allPosts,
  setshowDeleteConfirm,
  setPostId,
  setModalIsOpen,
  setshowDraftConfirm,
  comments,
}) => {
  const navigate = useNavigate();

  const delPost = (id) => {
    setshowDeleteConfirm(true);
    setshowDraftConfirm(false);
    setPostId(id);
    setModalIsOpen(true);
  };

  const updPost = (id) => {
    setshowDraftConfirm(true);
    setshowDeleteConfirm(false);
    setPostId(id);
    setModalIsOpen(true);
  };

  const getAllPostCommentLength = (id) => {
    let data = comments.filter((dt) => {
      if (dt.postId === id) {
        return dt;
      }
    });
    return data.length;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {searchArray.length < 1
            ? currentPosts.map((dt, index) => (
                <tr key={index}>
                  <td>{dt.title}</td>
                  <td>{dt.views}</td>
                  <td>{getAllPostCommentLength(dt.id)}</td>
                  <td>{dt.createdAt}</td>
                  <td className="actions">
                    <RiFileEditFill
                      onClick={() =>
                        navigate(`/gifttage/blog/admin/edit-blog/${dt.id}`)
                      }
                    />
                    <FaTrash onClick={() => delPost(dt.id)} />
                    <BsFileEarmarkZipFill onClick={() => updPost(dt.id)} />
                  </td>
                </tr>
              ))
            : searchArray.map((dt, index) => (
                <tr key={index}>
                  <td>{dt.title}</td>
                  <td>{dt.views}</td>
                  <td>{dt.comments}</td>
                  <td>{dt.createdAt}</td>
                  <td className="actions">
                    <RiFileEditFill
                      onClick={() =>
                        navigate(`/gifttage/blog/admin/edit-blog/${dt.id}`)
                      }
                    />
                    <FaTrash onClick={() => delPost(dt.id)} />
                    <BsFileEarmarkZipFill onClick={() => updPost(dt.id)} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
