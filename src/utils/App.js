import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashBoardUser from "./pages/DashBoardUser";
import { useState, useEffect } from "react";

function App() {
  const [totalPosts, setTotalPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("lendsqr_data")) {
      setTotalPosts(JSON.parse(localStorage.getItem("lendsqr_data")));
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Dashboard
                totalPosts={totalPosts && totalPosts}
                setTotalPosts={setTotalPosts}
              />
            }
          />
          <Route
            path="/login"
            exact
            element={
              <Login
                totalPosts={totalPosts && totalPosts}
                setTotalPosts={setTotalPosts}
              />
            }
          />
          <Route
            path="/user/:id"
            exact
            element={<DashBoardUser totalPosts={totalPosts && totalPosts} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
