import React, { useEffect, useState } from "react";
import "../../css/admin/Login.css";
import { PiSmileyXEyesFill } from "react-icons/pi";
import { LiaMehRollingEyes } from "react-icons/lia";
import { FaMehRollingEyes } from "react-icons/fa";
import { getUsers } from "../../firebase/firebase_routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingContainer from "../../components/LoadingContainer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = getItemWithExpiration("user");
    if (userData) {
      navigate("/gifttage/blog/admin");
    } else {
      navigate("/gifttage/blog/admin/login");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const notify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#000000",
        color: "#fff",
        border: "1px solid #444",
      },
    });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      getUsers().then((res) => {
        console.log(res.some((dt) => dt.email === email));
        if (res.some((dt) => dt.email === email)) {
          if (res.some((dt) => dt.password === password)) {
            console.log(res.filter((dt) => dt.email === email)[0]);
            setItemWithExpiration(
              "user",
              res.filter((dt) => dt.email === email)[0],
              24
            );
            setLoading(false);
            setEmail("");
            setPassword("");
            navigate("/gifttage/blog/admin");
          } else {
            notify("wrong credentials");
          }
        } else {
          notify("wrong credentials");
        }
      });
    }
  };

  function setItemWithExpiration(key, value, expirationInHours) {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInHours * 60 * 60 * 1000;
    const item = {
      value: value,
      expirationTime: expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

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

  return (
    <div className="login-container">
      <form action="" onSubmit={onSubmit}>
        <h1>Gifttage Corner</h1>
        {loading && <LoadingContainer newsletter={true} />}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.toLowerCase());
            setLoading(false);
          }}
          required
        />
        <div className="input">
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoading(false);
            }}
            required
          />
          {!showPassword ? (
            <FaMehRollingEyes onClick={togglePasswordVisibility} />
          ) : (
            <PiSmileyXEyesFill
              className="fill"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <button type="submit">LOGIN</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
