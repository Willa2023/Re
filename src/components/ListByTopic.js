import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ListByTopic = () => {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchArticlesByTopic = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/listByTopic/${topic}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArticleList(data);
      } catch (error) {
        console.error("Error fetching articles by topic:", error);
      }
    };

    fetchArticlesByTopic();
  }, [topic]);

  return (
    <div
      style={{ marginTop: "100px", marginLeft: "50px", textAlign: "center" }}
    >
      <h3>{`Articles related to ${topic}`}</h3>
      {articleList.length > 0 ? (
        <ul>
          {articleList.map((article) => (
            <li key={article.id}>
              <Link to={`/showArticle/${article.title}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found for the topic.</p>
      )}
    </div>
  );
};

export default ListByTopic;
