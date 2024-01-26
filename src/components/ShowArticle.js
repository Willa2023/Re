import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ShowArticle = () => {
  const { title } = useParams();
  const [articleData, setArticleData] = useState({
    title: "",
    topic: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/showArticle/${title}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArticleData(data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [title]);

  return (
    <div style={{ margin: "100px", textAlign: "center" }}>
      {articleData ? (
        <>
          <div>
            <h4>{`Title: ${articleData.title}`}</h4>
            <p>{`Topic: ${articleData.topic}`}</p>
            <p>{`Author: ${articleData.author}`}</p>
            <p>{`Content: ${articleData.content}`}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowArticle;
