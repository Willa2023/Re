// CreateArticle.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Username for link:", username);
  }, [username]);

  const handleCreateArticleClick = async (e) => {
    e.preventDefault();
    if (!username) {
      console.error("Username not available");
      return;
    }
    let response = await fetch("http://localhost:5005/createArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        title,
        topic,
        author: username,
        content,
      }),
    });
    let result = await response.json();
    if (result.code === 200) {
      setStatus({ success: true, message: "Article created successfully" });
      setTimeout(() => {
        navigate(`/showArticle/${title}`);
      }, 500);
    } else {
      console.log(result);
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col size={12} style={{ marginTop: "100px" }}>
          <h2>Create Article</h2>
          <Form>
            <Form.Group style={{ marginTop: "20px" }} controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "20px" }} controlId="formTitle">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{ marginTop: "20px" }}
              className="createAticle"
              controlId="formContent"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                style={{ height: "200px" }}
                type="text"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{ marginTop: "20px" }}
              variant="primary"
              onClick={handleCreateArticleClick}
            >
              Create Article
            </Button>
            <p className={status.success === false ? "danger" : "success"}>
              {status.message}
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateArticle;
