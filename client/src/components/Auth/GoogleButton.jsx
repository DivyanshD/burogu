import React from "react";
// import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function GoogleButton() {
  const googleSuccess = async (res) => {
    const token = res.credential;
    const data = jwt_decode(res.credential);
    console.log(data);

    try {
      localStorage.setItem("profile", JSON.stringify({ data, token }));
      location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return <GoogleLogin onSuccess={googleSuccess} onError={googleError} />;
}

export default GoogleButton;
