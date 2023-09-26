import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BlogPage from "./pages/BlogPage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import PageNumber from "./pages/PageNumber";
import CategoryPageNumber from "./pages/CategoryPageNumber";
import { useEffect, useState } from "react";
import BlogAdmin from "./pages/admin/BlogAdmin";
import CreateBlog from "./pages/admin/CreateBlog";
import DraftedBlog from "./pages/admin/DraftedBlog";
import EditBlog from "./pages/admin/EditBlog";
import Notifications from "./pages/admin/Notifications";
import Login from "./pages/admin/Login";
import Analytics from "./pages/admin/Analytics";

function App() {
  const [display, setDisplay] = useState();

  useEffect(() => {
    if (!localStorage.getItem("gifttage-display-mode")) {
      localStorage.setItem(
        "gifttage-display-mode",
        JSON.stringify({ display: false })
      );
    } else {
      setDisplay(
        JSON.parse(localStorage.getItem("gifttage-display-mode")).display
      );
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            exact
            element={<Home display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/contact"
            exact
            element={<Contact display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/:blog"
            exact
            element={<BlogPage display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/search"
            exact
            element={<SearchPage display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/blog/:category"
            exact
            element={<CategoryPage display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/page/:pageNumber"
            exact
            element={<PageNumber display={display} setDisplay={setDisplay} />}
          />
          <Route
            path="/blog/:category/page/:pageNumber"
            exact
            element={
              <CategoryPageNumber display={display} setDisplay={setDisplay} />
            }
          />
          <Route
            path="*"
            exact
            element={<NotFound display={display} setDisplay={setDisplay} />}
          />
          <Route path="/gifttage/blog/admin" exact element={<BlogAdmin />} />
          <Route
            path="/gifttage/blog/admin/create-blog"
            exact
            element={<CreateBlog />}
          />
          <Route
            path="/gifttage/blog/admin/edit-blog/:id"
            exact
            element={<EditBlog />}
          />
          <Route
            path="/gifttage/blog/admin/drafted-blogs"
            exact
            element={<DraftedBlog />}
          />
          <Route
            path="/gifttage/blog/admin/notifications"
            exact
            element={<Notifications />}
          />
          <Route path="/gifttage/blog/admin/login" exact element={<Login />} />
          <Route
            path="/gifttage/blog/admin/analytics"
            exact
            element={<Analytics />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
