import React, { useContext } from "react";
import { userContext } from "../context/UserContext";

const Profile = () => {
  const { userdata } = useContext(userContext);
  return (
    <div>
      <p>Hello profile</p>
      <p>{userdata.username}</p>
    </div>
  );
};

export default Profile;
