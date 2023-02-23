import React from "react";
import * as authService from "../services/auth";
const handleReg = () => {
  authService
    .register(
      "marionne",
      "quintana",
      "bio",
      "mars",
      "mars@gmail.com",
      "admin2255",
      "google.com"
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message[0]);
      }
    });
};
const RegisterButton = () => {
  return (
    <div>
      <button onClick={handleReg}>REGISTEWR</button>
    </div>
  );
};

export default RegisterButton;
