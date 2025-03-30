import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("User successfully loggedout!", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "bottom:center" });
    }
  };

  const fetchUserDetails = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setLoading(false);
          } else {
            toast.error("User data not found!", { position: "top-center" });
          }
        } catch (error) {
          toast.error("Error fetching user data!", { position: "top-center" });
        }
      } else {
        navigate("/login");
      }
    });

    // Return the unsubscribe function to clean up the listener
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserDetails();

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <div className="profile-container">
          <h2>Profile</h2>
          <p>
            <strong>First Name:</strong> {userDetails.fname}
          </p>
          <p>
            <strong>Last Name:</strong> {userDetails.lname}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <p>No user details found</p>
      )}
    </>
  );
};

export default Profile;
