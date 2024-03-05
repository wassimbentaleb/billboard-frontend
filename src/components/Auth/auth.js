import React, { useState } from "react";

import SignInSide from "./SignIn";
import SignUpSide from "./SignUp";


import "../../styles.css";

function Auth() {
  const [showSignup, setShowSignup] = useState(true);

  const handleLoginClick = () => {
    setShowSignup(!showSignup);
  };

  return (
   
      <div className="App" >
        {showSignup ? (
        <SignInSide handleLoginClick={handleLoginClick} />
      ) : (
        <SignUpSide handleLoginClick={handleLoginClick} />
      )}
      </div>
   
  );
}
export default Auth