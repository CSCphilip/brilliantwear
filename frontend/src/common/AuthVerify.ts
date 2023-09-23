import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AuthVerifyProps {
  logOut: () => void;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Option 1 - Handle JWT Token expiration with Route changes
const AuthVerify = (props: AuthVerifyProps) => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;
