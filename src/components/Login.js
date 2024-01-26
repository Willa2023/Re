import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Login = ({
  show,
  handleClose,
  setIsLoggedIn,
  setParentUsername,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });

  useEffect(() => {
    if (show) {
      setUsername("");
      setPassword("");
      setStatus({ success: false, message: "" });
    }
  }, [show]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
      if (result.code === 200) {
        console.log("Login successful");
        setStatus({ success: true, message: "Login successful" });
        setIsLoggedIn(true);
        setParentUsername(username);
        onLoginSuccess(username);
        setTimeout(() => {
          handleClose();
        }, 300);
      } else {
        console.log(result);
        setStatus({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <p className={status.success === false ? "danger" : "success"}>
          {status.message}
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
