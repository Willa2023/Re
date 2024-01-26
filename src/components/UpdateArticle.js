// UpdateArticle.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateArticle = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });

  const { username, articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleId) {
      fetchExistingArticle();
    }
  }, [username, articleId]);

  const fetchExistingArticle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/getArticle/${articleId}`
      );
      const result = await response.json();

      if (response.ok) {
        setTitle(result.title || "");
        setTopic(result.topic || "");
        setContent(result.content || "");
      } else {
        console.log(result);
        setStatus({
          success: false,
          message: "Error fetching existing article data.",
        });
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setStatus({
        success: false,
        message: "Error fetching existing article data.",
      });
    }
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    if (!username) {
      console.error("Username not available");
      return;
    }

    let response = await fetch(
      `http://localhost:5005/updateArticle/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          title,
          topic,
          content,
        }),
      }
    );

    let result = await response.json();
    if (result.success) {
      setStatus({ success: true, message: "Article updated successfully" });

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
          <h2>Update Article</h2>
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
              onClick={handleUpdateClick}
            >
              Update Article
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

export default UpdateArticle;
