import React, { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropDown";
import UserRowMenu from "./UserRowMenu";
import { useNavigate } from "react-router-dom";
import { shortenEmail } from "../utils/data";

const UsersTable = ({
  currentPosts,
  currentPage,
  totalPosts,
  setTotalPosts,
  setSearchArray,
  searchArray,
}) => {
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filterDropDown1, setFilterDropDown1] = useState(false);
  const [filterDropDown2, setFilterDropDown2] = useState(false);
  const [filterDropDown3, setFilterDropDown3] = useState(false);
  const [filterDropDown4, setFilterDropDown4] = useState(false);
  const [searchData, setSearchData] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phonenumber: "",
    status: "",
  });

  useEffect(() => {
    function activate() {
      const parentUser = document.querySelectorAll(
        ".table-container .status-wrap"
      );

      if (currentPosts && currentPage) {
        Array.from(parentUser).forEach((userTag) => {
          if (userTag.textContent.toLowerCase() === "inactive") {
            userTag.classList.add("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          } else if (userTag.textContent.toLowerCase() === "pending") {
            userTag.classList.add("pending");
            userTag.classList.remove("blacklisted");
            userTag.classList.remove("inactive");
          } else if (userTag.textContent.toLowerCase() === "blacklisted") {
            userTag.classList.add("blacklisted");
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
          } else {
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          }
        });
      }

      if (searchArray.length < 1 || searchArray.length > 1) {
        Array.from(parentUser).forEach((userTag) => {
          if (userTag.textContent.toLowerCase() === "inactive") {
            userTag.classList.add("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          } else if (userTag.textContent.toLowerCase() === "pending") {
            userTag.classList.add("pending");
            userTag.classList.remove("blacklisted");
            userTag.classList.remove("inactive");
          } else if (userTag.textContent.toLowerCase() === "blacklisted") {
            userTag.classList.add("blacklisted");
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
          } else {
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          }
        });
      }
    }
    activate();
  }, [currentPosts, currentPage, searchArray]);

  const toggleFilterDropDown = () => {
    setFilterDropDown(!filterDropDown);
    setFilterDropDown1(false);
    setFilterDropDown2(false);
    setFilterDropDown3(false);
    setFilterDropDown4(false);
  };

  const toggleFilterDropDown1 = () => {
    setFilterDropDown1(!filterDropDown1);
    setFilterDropDown2(false);
    setFilterDropDown3(false);
    setFilterDropDown4(false);
    setFilterDropDown(false);
  };

  const toggleFilterDropDown2 = () => {
    setFilterDropDown2(!filterDropDown2);
    setFilterDropDown3(false);
    setFilterDropDown4(false);
    setFilterDropDown1(false);
    setFilterDropDown(false);
  };

  const toggleFilterDropDown3 = () => {
    setFilterDropDown3(!filterDropDown3);
    setFilterDropDown4(false);
    setFilterDropDown1(false);
    setFilterDropDown(false);
    setFilterDropDown2(false);
  };

  const toggleFilterDropDown4 = () => {
    setFilterDropDown4(!filterDropDown4);
    setFilterDropDown1(false);
    setFilterDropDown(false);
    setFilterDropDown2(false);
    setFilterDropDown3(false);
  };

  const shutFilterDropDown = () => {
    setFilterDropDown1(false);
    setFilterDropDown(false);
    setFilterDropDown2(false);
    setFilterDropDown3(false);
    setFilterDropDown4(false);
  };

  const handleClose = (index) => {
    // shutFilterDropDown();
    // toggleRowMenu(index);
  };

  const toggleRowMenu = (index) => {
    let rowMenu = false;
    const rowMenuElement = document.querySelectorAll(".row-menu");
    Array.from(rowMenuElement).forEach((element) => {
      if (
        element.id === `menu_${index}` &&
        element.classList.contains("show")
      ) {
        element.classList.remove("show");
        rowMenu = true;
      }

      if (element.id === `menu_${index}` && !rowMenu) {
        element.classList.add("show");
      } else {
        element.classList.remove("show");
      }
    });
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    } else {
      return str.slice(0, num) + "...";
    }
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className={` ${currentPosts.length >= 1 && "organization"} `}>
              <div className="wrap">
                <p>organization</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
              {filterDropDown && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className={`${currentPosts.length >= 1 && "username"} `}>
              <div className="wrap">
                <p>username</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown1}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
              {filterDropDown1 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className={`${currentPosts.length >= 1 && "email"}`}>
              <div className="wrap">
                <p>email</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown2}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
              {filterDropDown2 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className={`${currentPosts.length >= 1 && "phonenumber"}`}>
              <div className="wrap">
                <p>phone number</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown3}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
              {filterDropDown3 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className={`${currentPosts.length >= 1 && "datejoined"}`}>
              <div className="wrap">
                <p>date joined</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown4}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
              {filterDropDown4 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className={`${currentPosts.length >= 1 && "status"}`}>
              <div className="wrap">
                <p>status</p>
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleFilterDropDown4}
                    className="filter-icon"
                  >
                    <path
                      d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
                      fill="#545F7D"
                    />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {searchArray.length < 1
            ? currentPosts.map((dt, index) => (
                <tr key={index}>
                  <td data-label="ID" className="organization">
                    {truncateString(dt.organization, 18)}
                  </td>
                  <td data-label="ID" className="username">
                    {truncateString(dt.username, 14)}
                  </td>
                  <td data-label="ID" className="email">
                    {shortenEmail(dt.email)}
                  </td>
                  <td data-label="ID" className="phonenumber">
                    {dt.phonenumber}
                  </td>
                  <td data-label="ID" className="datejoined">
                    {dt.datejoined}
                  </td>
                  <td data-label="ID" className="status">
                    <div className="status-wrap ">{dt?.status}</div>
                    <svg
                      width="4"
                      height="16"
                      viewBox="0 0 4 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => toggleRowMenu(index)}
                      className="icon-menu-svg"
                    >
                      <path
                        d="M1.99992 4.1111C2.92214 4.1111 3.66658 3.36666 3.66658 2.44444C3.66658 1.52222 2.92214 0.777771 1.99992 0.777771C1.0777 0.777771 0.333252 1.52222 0.333252 2.44444C0.333252 3.36666 1.0777 4.1111 1.99992 4.1111ZM1.99992 6.33333C1.0777 6.33333 0.333252 7.07777 0.333252 7.99999C0.333252 8.92221 1.0777 9.66666 1.99992 9.66666C2.92214 9.66666 3.66658 8.92221 3.66658 7.99999C3.66658 7.07777 2.92214 6.33333 1.99992 6.33333ZM1.99992 11.8889C1.0777 11.8889 0.333252 12.6333 0.333252 13.5555C0.333252 14.4778 1.0777 15.2222 1.99992 15.2222C2.92214 15.2222 3.66658 14.4778 3.66658 13.5555C3.66658 12.6333 2.92214 11.8889 1.99992 11.8889Z"
                        fill="#545F7D"
                      />
                    </svg>
                    <UserRowMenu
                      index={index}
                      user={dt}
                      toggleRowMenu={toggleRowMenu}
                      totalPosts={totalPosts}
                      onHandleClose={handleClose}
                    />
                  </td>
                </tr>
              ))
            : searchArray.map((dt, index) => (
                <tr key={index}>
                  <td data-label="ID" className="organization">
                    {truncateString(dt.organizatio, 18)}
                  </td>
                  <td data-label="ID" className="username">
                    {truncateString(dt.username, 15)}
                  </td>
                  <td data-label="ID" className="email">
                    {shortenEmail(dt.email)}
                  </td>
                  <td data-label="ID" className="phonenumber">
                    {dt.phonenumber}
                  </td>
                  <td data-label="ID" className="datejoined">
                    {dt.datejoined}
                  </td>
                  <td data-label="ID" className="status">
                    <div className="status-wrap ">{dt?.status}</div>
                    <svg
                      width="4"
                      height="16"
                      viewBox="0 0 4 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => toggleRowMenu(index)}
                      className="icon-menu-svg"
                    >
                      <path
                        d="M1.99992 4.1111C2.92214 4.1111 3.66658 3.36666 3.66658 2.44444C3.66658 1.52222 2.92214 0.777771 1.99992 0.777771C1.0777 0.777771 0.333252 1.52222 0.333252 2.44444C0.333252 3.36666 1.0777 4.1111 1.99992 4.1111ZM1.99992 6.33333C1.0777 6.33333 0.333252 7.07777 0.333252 7.99999C0.333252 8.92221 1.0777 9.66666 1.99992 9.66666C2.92214 9.66666 3.66658 8.92221 3.66658 7.99999C3.66658 7.07777 2.92214 6.33333 1.99992 6.33333ZM1.99992 11.8889C1.0777 11.8889 0.333252 12.6333 0.333252 13.5555C0.333252 14.4778 1.0777 15.2222 1.99992 15.2222C2.92214 15.2222 3.66658 14.4778 3.66658 13.5555C3.66658 12.6333 2.92214 11.8889 1.99992 11.8889Z"
                        fill="#545F7D"
                      />
                    </svg>
                    <UserRowMenu
                      index={index}
                      user={dt}
                      toggleRowMenu={toggleRowMenu}
                      totalPosts={totalPosts}
                      onHandleClose={handleClose}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
