import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import WriteBlog from "./pages/WriteBlog";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs/")
      .then(function (response) {
        // handle success
        // console.log(response);
        setBlog(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  return (
    <GoogleOAuthProvider clientId="client id">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user === null ? (
                <Navigate to="/signin" replace />
              ) : (
                <Home user={user.data} userObj={user} blog={blog} />
              )
            }
          />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/writeblog" element={<WriteBlog />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
