import React, { useState } from "react";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const checkIfEmailExists = async (email) => {
    try {
      const users = collection(db, "Users");
      const usersData = await getDocs(users);
      const dataCollection = usersData.docs
        .map((doc) => doc.data())
        .some((doc) => doc.email === email);
      return dataCollection;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailExists = await checkIfEmailExists(email);
    if (!emailExists) {
      toast.error("Account does not exist, please register", {
        position: "bottom-center",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("User loggedin successfully!");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password", {
          position: "bottom-center",
        });
      } else {
        toast.error("Login failed. Please check your credentials", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="login-register-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit">Login</button>
        <p>
          Dont have account?<Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
