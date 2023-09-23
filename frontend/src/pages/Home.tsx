import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductCatalog from "../components/ProductCatalog";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

// NOTE: Remember to enter the following after creating a new file for a component: rafce

function Home() {
  const [content, setContent] = useState("");

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState<
    { username: string } | undefined
  >(undefined);

  // For public content
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  // For user, moderator, and admin content
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout", AuthService.logout);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      {!content.includes("<title>Error</title>") && <h1> {content} </h1>}
      <ul>
        {showModeratorBoard && (
          <li>
            <Link to={"/mod"}>Moderator Board</Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={"/admin"}>Admin Board</Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to={"/user"}>User</Link>
          </li>
        )}
      </ul>

      <hr></hr>

      <ul>
        {currentUser ? (
          <div>
            <li>
              <Link to={"/profile"}>Profile: {currentUser.username}</Link>
            </li>

            <button
              className="btn btn-success log-out-btn-margin"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <li>
              <Link to={"/register"}>Sign Up</Link>
            </li>
          </div>
        )}
      </ul>

      <hr></hr>
      <ProductCatalog />
    </div>
  );
}

export default Home;
