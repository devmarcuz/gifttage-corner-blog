import React, { useEffect } from "react";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { getPosts } from "../../firebase/firebase_routes";
import { useNavigate } from "react-router-dom";

const DraftedPostsTable = ({
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
  setCurrentPosts,
  indexOfFirstPost,
  indexOfLastPost,
  filterActivate,
  draftUrl,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (draftUrl) {
      getPosts().then((res) => {
        setCurrentPosts([
          ...(totalPosts &&
            totalPosts.slice(indexOfFirstPost, indexOfLastPost)),
        ]);
        if (filterActivate && setshowDraftConfirm) {
          return;
        }
      });
    }
  }, [
    totalPosts,
    indexOfLastPost,
    indexOfFirstPost,
    draftUrl,
    filterActivate,
    setshowDraftConfirm,
  ]);

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

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {searchArray.length < 1
            ? currentPosts.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.createdAt}</td>
                  <td className="actions">
                    <RiFileEditFill
                      onClick={() =>
                        navigate(`/gifttage/blog/admin/edit-blog/${data.id}`)
                      }
                    />
                    <FaTrash onClick={() => delPost(data.id)} />
                    <BsFileEarmarkCheckFill onClick={() => updPost(data.id)} />
                  </td>
                </tr>
              ))
            : searchArray.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.createdAt}</td>
                  <td className="actions">
                    <RiFileEditFill
                      onClick={() =>
                        navigate(`/gifttage/blog/admin/edit-blog/${data.id}`)
                      }
                    />
                    <FaTrash onClick={() => delPost(data.id)} />
                    <BsFileEarmarkCheckFill onClick={() => updPost(data.id)} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraftedPostsTable;
