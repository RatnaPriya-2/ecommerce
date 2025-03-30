import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fname: fname,
          lname: lname,
        });
      } else {
        console.log("error");
      }
      toast.success("User registered successfully!", {
        position: "top-center",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="login-register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname">First name</label>
            <input
              type="fname"
              id="fname"
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last name</label>
            <input
              type="lname"
              id="lname"
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
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
          <button className="submit">Register</button>
          <p>
            Already have account?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
