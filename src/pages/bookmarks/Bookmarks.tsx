import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnAuthenticatedPage from "../unauthenticated/UnAuthenticatedPage";

const Bookmarks = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello favourites</p>
        </div>
      ) : (
        <UnAuthenticatedPage />
      )}
    </div>
  );
};

export default Bookmarks;
