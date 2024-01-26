import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [showPersonPageButton, setShowPersonPageButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
  };

  const handleCloseCreateAccount = () => {
    setShowCreateAccount(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowCreateButton(false);
    setShowPersonPageButton(false);
    navigate("/");
  };

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUsername(username);
    setShowCreateButton(true);
    setShowPersonPageButton(true);
  };

  return (
    <>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand as={Link} to={isLoggedIn ? `/user/${username}` : "/"}>
            <h2>BLOG</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Navbar.Text className="mr-3">
                    Welcome, {username}
                  </Navbar.Text>
                  <Link to={`/personal-page/${username}`}>
                    <Button
                      className="custom-outline-primary"
                      variant="outline-primary"
                    >
                      Personal Page
                    </Button>
                  </Link>

                  <Link to={`/create-article/${username}`}>
                    <Button
                      className="custom-outline-primary"
                      variant="outline-primary"
                    >
                      Create Article
                    </Button>
                  </Link>
                  <Button
                    className="custom-outline-primary"
                    variant="outline-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="custom-outline-primary"
                    variant="outline-primary"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button
                    className="custom-outline-primary"
                    variant="outline-primary"
                    onClick={handleCreateAccountClick}
                  >
                    Create Account
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        setIsLoggedIn={setIsLoggedIn}
        setParentUsername={setUsername}
        onLoginSuccess={handleLoginSuccess}
      />
      <CreateAccount
        show={showCreateAccount}
        handleClose={handleCloseCreateAccount}
      />
    </>
  );
};
