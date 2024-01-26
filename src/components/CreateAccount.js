import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateAccount = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });

  useEffect(() => {
    if (show) {
      setUsername("");
      setPassword("");
      setEmail("");
      setStatus({ success: false, message: "" });
    }
  }, [show]);

  const handleCreateAccountClick = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5003/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    let result = await response.json();
    if (result.code === 200) {
      setStatus({ success: true, message: "Account created successfully" });
      setTimeout(() => {
        handleClose();
      }, 300);
    } else {
      console.log(result);
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateAccountClick}>
          Create Account
        </Button>
        <p className={status.success === false ? "danger" : "success"}>
          {status.message}
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAccount;
